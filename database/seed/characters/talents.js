export default async function talents(db, data) {
  await details(db, data);
  await scalings(db, data);
}

async function details(db, data) {
  const talents = data.talent;
  for (let i=0; i<=3; i++) {
    if (talents[i]) {
      const name = talents[i]['name'];
      const description = talents[i]['description'];
      const icon = talents[i]['icon'];
      await db.run(`INSERT INTO character_talents (character_id, id, name, description, icon)
      VALUES ($characterId, $id, $name, $description, $icon)`, {
        $characterId: data.id,
        $id: i,
        $name: name,
        $description: description,
        $icon: icon
      });
    }
  }
}

async function scalings(db, data) {
  const talents = data.talent;
  const stmt = await db.prepare(`INSERT INTO talent_scalings (character_id, talent_id, level, scaling_data)
    VALUES ($characterId, $talentId, $level, $scalingData)`);
  for (const [id, talent] of Object.entries(talents)) {
    if (id > 3) return;
    for (const [_, promote] of Object.entries(talent.promote)) {
      const level = promote.level;
      const desc = promote.description;
      const params = promote.params;
      const scaling = {desc, params};
      const scalingData = JSON.stringify(scaling);
      await stmt.run({
        $characterId: data.id,
        $talentId: id,
        $level: level,
        $scalingData: scalingData
      });
    }
  }
  await stmt.finalize();
}