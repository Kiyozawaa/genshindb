import db from './../database/db.js';

export async function getAllArtifacts() {
  const rows = await db.all('SELECT * FROM artifacts');
  const mapped = rows.map(r => 
    ({
      ...r,
      levelList: JSON.parse(r.levelList),
      affixList: JSON.parse(r.affixList),
      source: JSON.parse(r.source)
    })
  );
  return mapped;
}

export async function getArtifact(id) {
  const artiRows = await db.get('SELECT * FROM artifacts WHERE id = ?', id);
  const piecesRows = await db.all('SELECT * FROM artifact_pieces WHERE id = ?', id);
  return {
    ...artiRows,
    levelList: JSON.parse(artiRows.levelList),
    affixList: JSON.parse(artiRows.affixList),
    source: JSON.parse(artiRows.source),
    suit: {
      ...piecesRows
    }
  };
}