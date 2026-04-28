import db from './../database/db.js';

export async function getWeaponList() {
  const rows = await db.all('SELECT id, name, rank, type, description, specialProp, icon FROM weapons');
  return rows;
}