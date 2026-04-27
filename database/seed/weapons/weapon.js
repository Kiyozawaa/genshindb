import details from './details.js';
import db from './../../db.js';

export async function seedWeapons(weapon) {
  await details(db, weapon.data);
}