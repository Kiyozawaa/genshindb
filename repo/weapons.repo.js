import db from './../database/db.js';

export async function getWeaponList() {
  const rows = await db.all('SELECT id, name, rank, type, description, specialProp, icon FROM weapons');
  return rows;
}

export async function getWeapon(id) {
  const details = await getWeaponDetails(id);
  const passives = await getWeaponPassives(id);
  const baseStats = await getBaseStats(id);
  const ascensionStats = await getAscensionStats(id);
  return {
    ...details,
    passives,
    stats: {
      base: baseStats,
      ascension: ascensionStats
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

async function getAscensionStats(id) {
  const rows = await db.get('SELECT stat, value, growth FROM weapon_ascension_stats WHERE id = ?', id);
  return rows;
}