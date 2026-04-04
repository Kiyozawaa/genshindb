export default async function stats(db, data, characterId) {
  await baseStats(db, data.prop, characterId);
}

async function baseStats(db, data, characterId) {
  for (const prop of data) {
    try {
      await db.run(`
      INSERT INTO character_base_stats (character_id, stat, value, growth_curve)
      VALUES ($characterId, $stat, $value, $growth)
      `, {
        $characterId: characterId,
        $stat: prop.propType,
        $value: prop.initValue,
        $growth: prop.type
      });
    } catch (err) {
      console.log(err);
    }
  }
}