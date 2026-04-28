export default async function passives(db, data, id) {
  if (!data) return;
  const stmt = await db.prepare(`
    INSERT INTO weapon_passives (id, ascension, description)
    VALUES ($id, $ascension, $description)
    `);
  for (const [key, passive] of Object.entries(data)) {
    for (const [ascension, description] of Object.entries(passive.upgrade)) {
      await stmt.run({
        $id: id,
        $ascension: ascension,
        $description: description
      });
    }
  }
  await stmt.finalize();
}