export default async function stats(db, data, id) {
  await baseStats(db, data[0], id);
  await ascensionStats(db, data[1], id);
}

async function baseStats(db, data, id) {
  if (!data) return;
  const stat = data.propType || null;
  const value = data.initValue || null;
  const growth = data.type || null;
  if (!stat || !value || !growth) return;
  
  await db.run(`INSERT INTO weapon_base_stats (id, stat, value, growth)
    VALUES ($id, $stat, $value, $growth)`, {
      $id: id,
      $stat: stat,
      $value: value,
      $growth: growth
    });
}

async function ascensionStats(db, data, id) {
  if (!data) return;
  const stat = data.propType || null;
  const value = data.initValue || null;
  const growth = data.type || null;
  if (!stat || !value || !growth) return;
  
  await db.run(`INSERT INTO weapon_ascension_stats (id, stat, value, growth)
    VALUES ($id, $stat, $value, $growth)`, {
      $id: id,
      $stat: stat,
      $value: value,
      $growth: growth
    });
}