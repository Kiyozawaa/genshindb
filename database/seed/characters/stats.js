import fs from 'node:fs/promises';
import statGrowthTable from './statGrowthTable.json' with { type: 'json' };

export default async function stats(db, data, characterId) {
  //await baseStats(db, data.prop, characterId);
  //await ascensionStats(db, data.promote, characterId);
  //await statGrowth(db);
}

async function baseStats(db, data, characterId) {
  for (const prop of data) {
      await db.run(`
      INSERT INTO character_base_stats (character_id, stat, value, growth_curve)
      VALUES ($characterId, $stat, $value, $growth)
      `, {
        $characterId: characterId,
        $stat: prop.propType,
        $value: prop.initValue,
        $growth: prop.type
      }
    );
  }
}

async function ascensionStats(db, data, characterId) {
  for (const [ascension, promote] of data.entries()) {
    if (!promote.addProps) continue;
    for (const [stat, value] of Object.entries(promote.addProps)) {
      await db.run(`INSERT INTO character_ascension_stats
        (character_id, stat, value, ascension)
        VALUES ($characterId, $stat, $value, $ascension)`, {
          $characterId: characterId,
          $stat: stat,
          $value: value,
          $ascension: ascension
        }
      );
    }
  }
}

async function statGrowth(db) {
  const SEEDED = '.seeded';
  try {
    await fs.access(SEEDED);
    return;
  } catch {
  }
  
  for (const [rarity, levels] of Object.entries(statGrowthTable)) {
    for (const [level, value] of Object.entries(levels)) {
      await db.run(`
      INSERT INTO character_stat_growth (rarity, level, value)
      VALUES ($rarity, $level, $value)`, {
        $rarity: rarity,
        $level: level,
        $value: value
      });
    }
  }
  await fs.writeFile(SEEDED, '');
}