export async function getCharListFromAPI(API) {
  const ids = [];
  const conn = await fetch(API);
  const res = await conn.json();
  for (const id of Object.keys(res.data.items)) {
    ids.push(id);
  }
  return ids;
}

export async function characterExists(db) {
  const raw = await db.all('SELECT id FROM characters');
  const exists = new Set(raw.map(e => e.id));
  return exists;
}

export async function fetchWithRetry(url, RETRIES=3) {
  for (let i=0; i<RETRIES; i++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const res = await fetch(url, {signal: controller.signal});
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    } catch (err) {
      console.log(`Retry ${i+1} for ${url}`);
      if (i === RETRIES-1) {
        console.error(`Failed after retries: ${url}`);
        return null;
      }
      await sleep(500);
    }
  }
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}