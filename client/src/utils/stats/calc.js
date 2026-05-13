import { STAT_MAPPING } from './../mapping.js';

export function getAscension(level) {
  if (!level) return;
  if (level <= 20) return 0;
  if (level <= 40) return 1;
  if (level <= 50) return 2;
  if (level <= 60) return 3;
  if (level <= 70) return 4;
  if (level <= 80) return 5;
  if (level <= 100) return 6;
}

export function calcFinalStats(baseStats, statGrowth, level, ascensionStats, ascensionStat) {
  if (!baseStats || !statGrowth || !level || !ascensionStats) return null;
  
  const ascension = ascensionStats[getAscension(level)] ?? {};
  const result = {};

  for (const [key, prop] of Object.entries(STAT_MAPPING)) {
    const baseStat = baseStats[key] ?? null;
    if (!baseStat) continue;
    const multiplier = statGrowth[baseStat['growth_curve']][level];
    result[prop] = baseStat.value * multiplier + (ascension[key] ?? 0);
  }
  
  result.ascension = formatAscensionStat(ascension, ascensionStat);
  
  return result;
}

function formatAscensionStat(ascension, stat) {
  const rawValue = ascension[stat] ?? 0;
  const isFlatStat = isFlat(stat);
  return {
    stat: STAT_MAPPING[stat],
    value: isFlatStat ? rawValue : rawValue * 100
  };
}

function isFlat(stat) {
  return stat === 'FIGHT_PROP_ELEMENT_MASTERY';
}