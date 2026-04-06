import db from './../database/db.js';
import { ELEMENT_MAPPING, STAT_MAPPING, WEAPON_MAPPING } from './../database/seed/mapping.js';
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

export async function getCharacter(id) {
  const details = await getCharacterDetails(id);
  const baseStats = await getCharacterBaseStats(id);
  const ascensionStats = await getCharacterAscensionStats(id);
  const statGrowth = await getCharacterStatGrowth(`s${details.rarity}`);
  return {
    ...details,
    baseStats,
    ascensionStats,
    statGrowth
  };
}

async function getCharacterDetails(characterId) {
  const details = await db.get('SELECT * FROM characters WHERE id = ?', characterId);
  const {id, name, element, source, weapon, rarity, birth, constellation, native, description} = details;
  return {
    id,
    name,
    element: ELEMENT_MAPPING[element],
    source,
    weapon: WEAPON_MAPPING[weapon],
    rarity,
    birth,
    constellation,
    native,
    description
  };
}

async function getCharacterBaseStats(characterId) {
  const baseStatsRow = await db.all('SELECT stat, value FROM character_base_stats WHERE character_id = ?', characterId);
  const baseStats = baseStatsRow?.reduce((acc, row) => {
    acc[row.stat] = row.value;
    return acc;
  }, {});
  return baseStats;
}

async function getCharacterAscensionStats(characterId) {
  const rows = await db.all('SELECT stat, value, ascension FROM character_ascension_stats WHERE character_id = ?', characterId);
  const ascensionStats = rows.reduce((acc, row) => {
    if (!acc[row.ascension]) acc[row.ascension] = {};
    acc[row.ascension][row.stat] = row.value;
    return acc;
  }, {});
  return ascensionStats;
}

async function getCharacterStatGrowth(rarity) {
  const rows = await db.all('SELECT level, value FROM character_stat_growth WHERE rarity = ?', rarity);
  const statGrowth = rows.reduce((acc, row) => {
    acc[row.level] = row.value;
    return acc;
  }, {});
  return statGrowth;
}