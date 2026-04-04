import db from './../database/db.js';

export async function getAllCharacters() {
  const chars = await db.get('SELECT * FROM characters');
  return chars;
}

export async function getCharacter(characterId) {
  return await db.get('SELECT * FROM characters WHERE id = ?', [characterId]);
}