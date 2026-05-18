export default async function upgradeCost(db, character) {
  await ascensionCost(db, character.data.upgrade.promote, character.data.id);
}

async function ascensionCost(db, data, characterId) {
  const stmt = await db.prepare(`
    INSERT INTO character_upgrade_cost(id, ascension, costItems, unlockMaxLevel, requiredPlayerLevel, coinCost)
    VALUES ($id, $ascension, $costItems, $unlockMaxLevel, $requiredPlayerLevel, $coinCost)`);
  
  for (const promote of data) {
    const ascension = promote.promoteLevel;
    const unlockMaxLevel = promote.unlockMaxLevel;
    const costItems = JSON.stringify(promote.costItems) || null;
    const requiredPlayerLevel = promote.requiredPlayerLevel || 0;
    const coinCost = promote.coinCost || 0;
    await stmt.run({
      $id: characterId,
      $ascension: ascension,
      $costItems: costItems,
      $unlockMaxLevel: unlockMaxLevel,
      $requiredPlayerLevel: requiredPlayerLevel,
      $coinCost: coinCost
    });
  }
  await stmt.finalize();
}