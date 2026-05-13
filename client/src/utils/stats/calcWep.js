import { getAscension } from './calc.js';

export function calcBaseStat(baseStat, ascensionStats, levelmult, level) {
  const atk = baseStat.value;
  const mult = levelmult[level];
  const ascension = ascensionStats[getAscension(level)] || 0;
  return atk * mult + ascension;
}