import db from './../database/db.js';

export async function getAllMaterials() {
  const rows = await db.all(`SELECT id, name, rank, type, icon FROM materials`);
  return rows;
}

export async function getMaterial(matId) {
  const rows = await db.get(`SELECT * FROM materials where id = ?`, matId);
  const { id, name, rank, type, recipe, storyId, icon, description } = rows;
  const mapMark = JSON.parse(rows.mapMark);
  const source = JSON.parse(rows.source);
  const additions = JSON.parse(rows.additions);

  return {
    id,
    name,
    rank,
    type,
    recipe,
    storyId,
    mapMark,
    source,
    additions,
    icon,
    description
  };
}