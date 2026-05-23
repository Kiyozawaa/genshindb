import db from './../../db.js';

export default async function seedMaterials(material, characterId) {
  if (!material) return;
  const data = material.data;
  const mapMark = JSON.stringify(data.mapMark);
  const source = JSON.stringify(data.source);
  const additions = JSON.stringify(data.additions);
  await db.run(`
    INSERT INTO materials (id, name, rank, type, recipe, storyId, mapMark, source, additions, icon, description)
    VALUES ($id, $name, $rank, $type, $recipe, $storyId, $mapMark, $source, $additions, $icon, $description)`, {
      $id: characterId,
      $name: data.name,
      $rank: data.rank,
      $type: data.type,
      $recipe: data.recipe,
      $storyId: data.storyId,
      $mapMark: mapMark,
      $source: source,
      $additions: additions,
      $icon: data.icon,
      $description: data.description
    });
}