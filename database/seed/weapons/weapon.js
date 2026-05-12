import details from './details.js';
import passives from './passives.js'; 
import stats from './stats.js'; 
import db from './../../db.js';

export async function seedWeapons(weapon) {
  await details(db, weapon.data);
  await passives(db, weapon.data.affix, weapon.data.id);
  await stats(db, weapon.data.upgrade.prop, weapon.data.id);
}