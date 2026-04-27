import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import fs from 'node:fs/promises';
import { seedCharacters } from './characters/character.js';
import { getItemListFromAPI, itemExists, fetchWithRetry, sleep, seedItems} from './utils.js';
import { statGrowth } from './characters/stats.js';
import db from './../db.js';
import 'dotenv/config';

const API = process.env.API;
const __dirname = dirname(fileURLToPath(import.meta.url));

// export async function seeder() {
//   const res = await fetch(`https://gi.yatta.moe/api/v2/en/avatar/10000119`);
//   const char = await res.json();
//   await seedCharacters(char);
// }

export async function seeder() {
  const SEEDED = '.seeded';
  try {
    await fs.access(SEEDED);
    return;
  } catch {
  }
  console.log('Fetching character id list.');
  const charIdList = await getItemListFromAPI(`${API}/avatar`);
  console.log(`Fetched ${charIdList.length} characters.`);
  const charExists = await itemExists(db, 'characters');
  await db.run('BEGIN TRANSACTION');
  try {
    await seedItems(charIdList, charExists, 'avatar', seedCharacters);
    await statGrowth(db);
    await db.run('COMMIT');
    await fs.writeFile(SEEDED, '');
  } catch (err) {
    await db.run('ROLLBACK');
    console.log(`Seeding failed: ${err}`);
  }
}
