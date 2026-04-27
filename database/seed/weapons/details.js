export default async function details(db, data) {
  const {id, rank, type, name, description, specialProp, icon} = data;
  await db.run(`
    INSERT INTO weapons (id, name, rank, type, description, specialProp, icon)
    VALUES ($id, $name, $rank, $type, $description, $specialProp, $icon)`,
    {
      $id: id,
      $name: name,
      $rank: rank,
      $type: type,
      $description: description,
      $specialProp: specialProp,
      $icon: icon
    }
  );
}