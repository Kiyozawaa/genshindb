import details from './details.js';
import passives from './passives.js'; 
import db from './../../db.js';

export async function seedWeapons(weapon) {
  await details(db, weapon.data);
  await passives(db, weapon.data.affix, weapon.data.id);
}