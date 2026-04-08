export default async function constellations(db, data, characterId) {
  if (!data) return;
  const stmt = await db.prepare(`
    INSERT INTO constellations (character_id, id, name, description)
    VALUES ($characterId, $id, $name, $description)`);
  for (const [key, c] of Object.entries(data)) {
    await stmt.run({
      $characterId: characterId,
      $id: c.id,
      $name: c.name,
      $description: c.description
    });
  }
  await stmt.finalize();
}