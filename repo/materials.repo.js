import db from './../database/db.js';

export async function getAllMaterials() {
  const rows = await db.all(`SELECT id, name, rank, icon FROM materials`);
  return rows;
}

export async function getMaterial(id) {
  const rows = await db.get(`SELECT * FROM materials where id = ?`, id);
  return rows;
}