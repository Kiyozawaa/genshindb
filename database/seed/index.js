import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import fs from 'node:fs/promises';
import { seedCharacters } from './characters/character.js';
import { getCharListFromAPI, characterExists, fetchWithRetry, sleep} from './utils.js';
import { statGrowth } from './characters/stats.js';
import db from './../db.js';
import 'dotenv/config';

const API = process.env.API;
const __dirname = dirname(fileURLToPath(import.meta.url));

//export async function seeder() {
  // const res = await fetch(`https://gi.yatta.moe/api/v2/en/avatar/10000119`);
  // const char = await res.json();
  // console.log(char.response)
  // await seedCharacters(char);
//}

export async function seeder() {
  const SEEDED = '.seededDB';
  try {
    await fs.access(SEEDED);
    return;
  } catch {
  }
  console.log('Fetching character id list.');
  const charIdList = await getCharListFromAPI(API);
  const exists = await characterExists(db);
  
  console.log(`Fetched ${charIdList.length} characters.`);
  await db.run('BEGIN TRANSACTION');
  try {
    const BATCH_SIZE = 5;
    for (let i = 0; i < charIdList.length; i+=BATCH_SIZE) {
      const batch = charIdList.slice(i, i+BATCH_SIZE);
      
      await Promise.all(
        batch.map(async (charId) => {
          if (exists.has(charId)) {
            console.log(`Skipping ${charId}`);
            return;
          }
          console.log(`Fetching ${charId}`);
          const character = await fetchWithRetry(`${API}/${charId}`);
          if (!character) return;
          await seedCharacters(character);
        })
      );
      await sleep(300);
    }
    await statGrowth(db);
    await db.run('COMMIT');
    await fs.writeFile(SEEDED, '');
  } catch (err) {
    await db.run('ROLLBACK');
    console.log(`Seeding failed: ${err}`);
  }
}
