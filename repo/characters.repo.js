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
  const statGrowth = await getCharacterStatGrowth(id);
  const passives = await getCharacterPassives(id);
  const constellations = await getConstellations(id);
  const talents = await getTalents(id);
  return {
    ...details,
    baseStats,
    ascensionStats,
    statGrowth,
    talents,
    passives,
    constellations
  };
}

async function getCharacterDetails(characterId) {
  const details = await db.get('SELECT * FROM characters WHERE id = ?', characterId);
  const {id, name, element, source, weapon, rarity, birth, release, constellation, region, native, description, ascension_stat} = details;
  return {
    id,
    name,
    element: ELEMENT_MAPPING[element],
    source,
    weapon: WEAPON_MAPPING[weapon],
    rarity,
    birth,
    release,
    constellation,
    region,
    native,
    description,
    ascension_stat
  };
}

async function getCharacterBaseStats(characterId) {
  const baseStatsRow = await db.all('SELECT stat, value, growth_curve FROM character_base_stats WHERE character_id = ?', characterId);
  const baseStats = baseStatsRow?.reduce((acc, row) => {
    acc[row.stat] = {'value': row.value, 'growth_curve': row.growth_curve};
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

async function getCharacterStatGrowth(characterId) {
  const curves = await db.all('SELECT DISTINCT growth_curve FROM character_base_stats WHERE character_id = ?', characterId);
  
  const statGrowth = {};
  for (const {growth_curve} of curves) {
    const growthTable = await db.all('SELECT level, value FROM character_stat_growth WHERE stat = ?', growth_curve);
    statGrowth[growth_curve] = growthTable.reduce((acc, row) => {
      acc[row.level] = row.value;
      return acc;
    }, {});
  }
  return statGrowth;
}

async function getCharacterPassives(characterId) {
  const rows = await db.all(`
  SELECT id, name, description, icon
  FROM character_passives
  WHERE character_id = ?
  ORDER BY id ASC`, characterId);
  return rows;
}

async function getConstellations(characterId) {
  const rows = await db.all('SELECT id, name, description FROM constellations WHERE character_id = ?', characterId);
  return rows;
}

async function getTalents(characterId) {
  const rows = await db.all('SELECT id, name, description, icon FROM character_talents WHERE character_id = ?', characterId);
  const scalingRows = await getTalentScalings(characterId);
  const scaling = scalingRows.reduce((acc, row) => {
    if (!acc[row.talent_id]) acc[row.talent_id] = {};
    acc[row.talent_id][row.level] = JSON.parse(row.scaling_data);
    return acc;
    }, {});
  const talents = rows.map(r => ({
    ...r,
    promote: scaling[r.id] ?? {}
  }
    ));
  
  return talents;
}

async function getTalentScalings(characterId) {
  const rows = await db.all(`SELECT talent_id, level, scaling_data FROM talent_scalings WHERE character_id = ?`, characterId);
  const result = rows.map(r => (
    {
      id: r.talent_id,
      level: r.level,
      scaling: JSON.parse(r.scaling_data)
    }
    ));
  return rows;
}

async function getUpcomingBirthdays() {
  const characters = await db.all(`
  SELECT c.id, c.name, c.birth, a.uri AS icon
  FROM characters c
  LEFT JOIN character_avatars a
  ON c.id = a.character_id
  AND a.type = 'icon'
  `);
  const today = new Date();
  const currMonth = today.getMonth() + 1;
  const currDay = today.getDay();
  const upcoming = characters.map(char => {
    const [month, date] = char.birth.split('/').map(Number);
    const bday = new Date(today.getFullYear(), month - 1, date);
    if (bday < today) bday.setFullYear(today.getFullYear() + 1);
    const daysUntil = Math.ceil((bday - today) / (1000 * 60 * 60 * 24));
    return { ...char, daysUntil }
  })
  .sort((a, b) => a.daysUntil - b.daysUntil)
  .slice(0, 8);
  return upcoming;
}

async function getNewReleases() {
  const chars = await db.all(`
  SELECT c.id, c.name, c.release, a.uri AS icon
  FROM characters c
  LEFT JOIN character_avatars a
  ON c.id = a.character_id
  AND a.type = 'icon'`);
  const today = new Date();
  const newReleases = chars.map(char => {
    const release = new Date(char.release * 1000);
    const diff = Math.ceil((today - release) / (1000 * 60 * 60 *24));
    return { ...char, diff };
  })
  .sort((a, b) => a.diff - b.diff)
  .filter(c => c.diff <= 50)
  .slice(0, 3);
  return newReleases;
}

export async function homepage() {
  const upcoming = await getUpcomingBirthdays();
  const newCharacters = await getNewReleases();
  return [upcoming, newCharacters];
}