import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import fs from 'node:fs/promises';
import { seedCharacters } from './characters/character.js';
import { seedWeapons } from './weapons/weapon.js';
import { getItemListFromAPI, itemExists, seedItems} from './utils.js';
import { statGrowth } from './characters/stats.js';
import characterProfile from './characters/profile.js';
import weaponStatGrowth from './weapons/statGrowth.js';
import weaponAscensionGrowth from  './weapons/ascension.js';
import seedMaterials from './materials/material.js';
import artifacts from './artifacts/artifact.js';
import db from './../db.js';
import 'dotenv/config';

const API = process.env.API;
const __dirname = dirname(fileURLToPath(import.meta.url));

export async function seeder() {
  const SEEDED = '.seeded';
  try {
    await fs.access(SEEDED);
    return;
  } catch {
  }
  await db.run('BEGIN TRANSACTION');
  try {
    console.log('Fetching character id list.');
    const charIdList = await getItemListFromAPI(`${API}/avatar`);
    console.log(`Fetched ${charIdList.length} characters.`);
    const charExists = await itemExists(db, 'characters');
    await seedItems(charIdList, charExists, 'avatar', seedCharacters);
    
    const charStoryIdList = [...new Set(charIdList.map(c => (c.replace(/-[a-z]{1,10}/, ''))))];
    const charStoryIdExists = await itemExists(db, 'character_stories');
    await seedItems(charStoryIdList, charStoryIdExists, 'avatarFetter', characterProfile);
  
    console.log('Fetching weapon id list.');
    const wepIdList = await getItemListFromAPI(`${API}/weapon`);
    const wepExists = await itemExists(db, 'weapons');
    await seedItems(wepIdList, wepExists, 'weapon', seedWeapons);
  
    console.log('Fetching Material Id List...')
    const materialIdList = await getItemListFromAPI(`${API}/material`);
    const materialExists = await itemExists(db, 'materials');
    await seedItems(materialIdList, materialExists, 'material', seedMaterials);
  
    console.log('Fetching Artifact Id List');
    const artiIdList = await getItemListFromAPI(`${API}/reliquary`);
    const artiExists = await itemExists(db, 'artifacts');
    await seedItems(artiIdList, artiExists, 'reliquary', artifacts);
    
    await statGrowth(db);
    await weaponStatGrowth(db);
    await weaponAscensionGrowth(db);
    await db.run('COMMIT');
    await fs.writeFile(SEEDED, '');
  } catch (err) {
    await db.run('ROLLBACK');
    console.log(`Seeding failed: ${err}`);
  }
}
