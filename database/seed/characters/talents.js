export default async function talents(db, data) {
  const talents = data.talent;
  console.log(`Seeding Talents for  ${data.name}`);
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