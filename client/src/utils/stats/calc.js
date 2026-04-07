import { STAT_MAPPING } from './../mapping.js';

function getAscension(level) {
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
  const ascentValue = ascension[ascensionStat];
  if (!result['ascension']) result['ascension'] = {};
  result['ascension']['stat'] = STAT_MAPPING[ascensionStat];
  result['ascension']['value'] = ascentValue ? ascentValue * 100 : 0;
  return result;
}