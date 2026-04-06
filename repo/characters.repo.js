import db from './../database/db.js';
import { STAT_MAPPING } from './../database/seed/mapping.js';
export async function getAllCharacters() {
  const chars = await db.get('SELECT * FROM characters');
  return chars;
}

export async function getCharacterList() {
  const charList = await db.all(`
    SELECT c.id, c.name, a.uri AS icon
    FROM characters c
    LEFT JOIN character_avatars a
    ON c.id = a.character_id
    AND a.type = 'icon'
  `);
  return charList;
}

export async function getCharacter(characterId) {
  const details = await db.get('SELECT * FROM characters WHERE id = ?', characterId);
  const baseStatsRow = await db.all('SELECT stat, value FROM character_base_stats WHERE character_id = ?', characterId);
  const baseStats = baseStatsRow?.reduce((acc, row) => {
    acc[STAT_MAPPING[row.stat]] = row.value;
    return acc;
  }, {});
  return {
    ...details,
    baseStats
  };
}