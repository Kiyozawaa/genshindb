import { getAscension, isFlat } from './calc.js';

export function calcBaseStat(baseStat, ascensionStats, levelmult, level) {
  const atk = baseStat.value;
  const mult = levelmult[level];
  const ascension = ascensionStats[getAscension(level)] || 0;
  return Math.round(atk * mult + ascension);
}

export function calcSecondaryStat(secondaryStat, levelmult, level) {
  const isFlatStat = isFlat(secondaryStat.stat);
  const stat = isFlatStat ? secondaryStat.value : secondaryStat.value * 100;
  const mult = levelmult[level];
  const finalStat = stat * mult;
  return isFlatStat ? Math.round(finalStat) : finalStat.toFixed(1);
}