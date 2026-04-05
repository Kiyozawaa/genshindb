export default async function avatar(db, data) {
  await avatarIcon(db, data.icon, data.id);
}

async function avatarIcon(db, avatarName, characterId) {
  await db.run(`
    INSERT INTO character_avatars (character_id, type, uri)
    VALUES ($characterId, $type, $uri)`, {
      $characterId: characterId,
      $type: 'icon',
      $uri: avatarName
    });
}