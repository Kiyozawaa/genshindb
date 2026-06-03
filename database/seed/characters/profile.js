import db from './../../db.js';

export default async function profiles(data, id) {
  await stories(data.data.story, id);
}

async function stories(data, id) {
  const stmt = await db.prepare(`
    INSERT INTO character_stories
    (sid, id, title, title2, text, text2 , tips)
    VALUES
    ($sid, $id, $title, $title2, $text, $text2, $tips)
  `);
  for (const [index, story] of Object.entries(data)) {
    await stmt.run({
      $sid: index,
      $id: id,
      $title: story.title,
      $title2: story.title2,
      $text: story.text,
      $text2: story.text2,
      $tips: story.tips
    });
  }
  await stmt.finalize();
}