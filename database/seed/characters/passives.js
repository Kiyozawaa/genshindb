
export default async function passives(db, data) {
  const talents = data.talent;
  for (let i=4; i<=10; i++) {
    if (talents[i]) {
      const name = talents[i]['name'];
      const description = talents[i]['description'];
      const icon = talents[i]['icon'];
      await db.run(`INSERT INTO character_passives (character_id, id, name, description, icon)
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