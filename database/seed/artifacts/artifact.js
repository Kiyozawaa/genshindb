import db from './../../db.js';

export default async function artifact(data) {
  await details(data.data);
  await pieces(data.data.suit, data.data.id);
}

async function details(data) {
  const levelList = JSON.stringify(data.levelList);
  const affixList = JSON.stringify(data.affixList);
  const source = JSON.stringify(data.source);
  await db.run(`
    INSERT INTO artifacts
    (id, name, levelList, affixList, icon, source)
    VALUES ($id, $name, $levelList, $affixList, $icon, $source)
    `, {
      $id: data.id,
      $name: data.name,
      $levelList: levelList,
      $affixList: affixList,
      $icon: data.icon,
      $source: source
    });
}

async function pieces(data, id) {
  const stmt = await db.prepare(`
    INSERT INTO artifact_pieces
    (id, type, name, description, maxLevel, icon)
    VALUES
    ($id, $type, $name, $description, $maxLevel, $icon)`);
  for (const [type, piece] of Object.entries(data)) {
    await stmt.run({
      $id: id,
      $type: type,
      $name: piece.name,
      $description: piece.description,
      $maxLevel: piece.maxLevel,
      $icon: piece.icon
    });
  }
  await stmt.finalize();
}