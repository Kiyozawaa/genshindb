import { STAT_MAPPING } from './../mapping.js';

function getAscension(level) {
  if (!level) return;
  if (level <= 20) return 0;
  if (level <= 40) return 1;
  if (level <= 50) return 2;
  if (level <= 60) return 3;
  if (level <= 70) return 4;
  if (level <= 80) return 5;
  if (level <= 90) return 6;
}

export function calcFinalStats(baseStats, statGrowth, level, ascensionStats) {
  if (!baseStats || !statGrowth || !level || !ascensionStats) return null;
  
  const ascension = ascensionStats[getAscension(level)] ?? {};
  const multiplier = statGrowth[level];
  const result = {};
  
  for (const [key, prop] of Object.entries(STAT_MAPPING)) {
    result[prop] = baseStats[key] * multiplier + (ascension[key] ?? 0);
  }
  return result;
}