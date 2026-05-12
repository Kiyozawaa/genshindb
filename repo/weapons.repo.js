import db from './../database/db.js';

export async function getWeaponList() {
  const rows = await db.all('SELECT id, name, rank, type, description, specialProp, icon FROM weapons');
  return rows;
}

export async function getWeapon(id) {
  const details = await getWeaponDetails(id);
  const passives = await getWeaponPassives(id);
  const baseStats = await getBaseStats(id);
  const secondaryStats = await getSecondaryStats(id);
  const baseGrowth = await getBaseGrowthTable(baseStats.growth);
  const secondaryGrowth = await getSecondaryGrowthTable();
  return {
    ...details,
    passives,
    stats: {
      base: baseStats,
      secondary: secondaryStats
    },
    growth: {
      base: baseGrowth,
      secondary: secondaryGrowth
    }
  };
}

async function getWeaponDetails(id) {
  const rows = await db.get('SELECT * FROM weapons WHERE id = ?', id);
  return rows;
}

async function getWeaponPassives(id) {
  const rows = await db.all('SELECT * FROM weapon_passives WHERE id = ?', id);
  return rows;
}

async function getBaseStats(id) {
  const rows = await db.get('SELECT stat, value, growth FROM weapon_base_stats WHERE id = ?', id);
  return rows;
}

async function getSecondaryStats(id) {
  const rows = await db.get('SELECT stat, value, growth FROM weapon_ascension_stats WHERE id = ?', id);
  return rows;
}

async function getBaseGrowthTable(curve) {
  const rows = await db.all('SELECT level, value FROM weapon_growth_base WHERE curve = ?', curve);
  const map = {};
  rows.map(r => (
    map[r.level] = r.value
    ));
  return map;
}

async function getSecondaryGrowthTable() {
  const rows = await db.all('SELECT * from weapon_growth_secondary');
  const map = {};
  rows.map(r => (
    map[r.level] = r.value
    )
  );
  return map;
}