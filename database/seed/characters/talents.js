export default async function talents(db, data, characterId) {
  await details(db, data, characterId);
  await scalings(db, data, characterId);
  await passives(db, data, characterId);
}

async function details(db, data, characterId) {
  const stmt = await db.prepare(`
  INSERT INTO character_talents (character_id, id, name, description, icon)
  VALUES ($character_id, $id, $name, $description, $icon)
    `);
  for (const [id, talent] of Object.entries(data)) {
    if (!talent.promote) continue;
    await stmt.run({
      $character_id: characterId,
      $id: id,
      $name: talent.name,
      $description: talent.description,
      $icon: talent.icon
    });
  }
  await stmt.finalize();
}

async function scalings(db, data, characterId) {
  const stmt = await db.prepare(`INSERT INTO talent_scalings (character_id, talent_id, level, scaling_data)
    VALUES ($characterId, $talentId, $level, $scalingData)`);
  for (const [id, talent] of Object.entries(data)) {
    if (!talent.promote) continue;
    for (const [_, promote] of Object.entries(talent.promote)) {
      const desc = promote.description;
      const params = promote.params;
      const scaling = {desc, params};
      const scalingData = JSON.stringify(scaling);
      await stmt.run({
        $characterId: characterId,
        $talentId: id,
        $level: promote.level,
        $scalingData: scalingData
      });
    }
  }
  await stmt.finalize();
}

async function passives(db, data, characterId) {
  const stmt = await db.prepare(`
  INSERT INTO character_passives (character_id, id, name, description, icon)
  VALUES ($character_id, $id, $name, $description, $icon)
    `);
  for (const [id, talent] of Object.entries(data)) {
    if (talent.promote) continue;
    await stmt.run({
      $character_id: characterId,
      $id: id,
      $name: talent.name,
      $description: talent.description,
      $icon: talent.icon
    });
  }
  await stmt.finalize();
}