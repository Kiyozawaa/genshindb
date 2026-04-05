import db from './../database/db.js';

export async function getAllCharacters() {
  const chars = await db.get('SELECT * FROM characters');
  return chars;
}

export async function getCharacter(characterId) {
  return await db.get('SELECT * FROM characters WHERE id = ?', [characterId]);
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