import db from './../database/db.js';

export async function getWeaponList() {
  const rows = await db.all('SELECT id, name, rank, type, description, specialProp, icon FROM weapons');
  return rows;
}

export async function getWeapon(id) {
  const details = await getWeaponDetails(id);
  return {
    ...details
  };
}

async function getWeaponDetails(id) {
  const rows = await db.get('SELECT * FROM weapons WHERE id = ?', id);
  return rows;
}
