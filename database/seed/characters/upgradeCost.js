export default async function upgradeCost(db, character) {
  await ascensionCost(db, character.data.upgrade.promote, character.data.id);
  await talentLevelUpCost(db, character.data.talent, character.data.id);
}

async function ascensionCost(db, data, characterId) {
  const stmt = await db.prepare(`
    INSERT INTO character_upgrade_cost(id, ascension, costItems, unlockMaxLevel, requiredPlayerLevel, coinCost)
    VALUES ($id, $ascension, $costItems, $unlockMaxLevel, $requiredPlayerLevel, $coinCost)`);
  
  for (const promote of data) {
    const costItems = JSON.stringify(promote.costItems) || null;
    const requiredPlayerLevel = promote.requiredPlayerLevel || null;
    const coinCost = promote.coinCost || null;
    await stmt.run({
      $id: characterId,
      $ascension: promote.promoteLevel,
      $costItems: costItems,
      $unlockMaxLevel: promote.unlockMaxLevel,
      $requiredPlayerLevel: requiredPlayerLevel,
      $coinCost: coinCost
    });
  }
  await stmt.finalize();
}

async function talentLevelUpCost(db, data, characterId) {
  const stmt = await db.prepare(`
    INSERT INTO talent_upgrade_cost (character_id, talent_id, level, costItems, coinCost)
    VALUES ($character_id, $talent_id, $level, $costItems, $coinCost)`);
    
  for (const [id, talent] of Object.entries(data)) {
    if (!talent.promote) continue;
    const talentId = talent.skillId;
    for (const [_, promote] of Object.entries(talent.promote)) {
      const level = promote.level;
      const costItems = promote.costItems;
      const coinCost = promote.coinCost;
      await stmt.run({
        $character_id: characterId,
        $talent_id: id,
        $level: level,
        $costItems: costItems,
        $coinCost: coinCost
      });
    }
  }
  await stmt.finalize();
}