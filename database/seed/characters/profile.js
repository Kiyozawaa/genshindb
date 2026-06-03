import db from './../../db.js';

export default async function profiles(data, id) {
  await stories(data.data.story, id);
  await quotes(data.data.quotes, id);
}

async function stories(data, id) {
  const stmt = await db.prepare(`
    INSERT INTO character_stories
    (sid, id, title, title2, text, text2 , tips)
    VALUES
    ($sid, $id, $title, $title2, $text, $text2, $tips)
  `);
  for (const [sid, story] of Object.entries(data)) {
    await stmt.run({
      $sid: sid,
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

async function quotes(data, id) {
  const stmt = await db.prepare(`
    INSERT INTO character_quotes
    (id, sid, title, audio, text, tips, tasks)
    VALUES
    ($id, $sid, $title, $audio, $text, $tips, $tasks)
  `);
  for (const [sid, quote] of Object.entries(data)) {
    const tasks = JSON.stringify(quote.tasks) || null;
    await stmt.run({
      $id: id,
      $sid: sid,
      $title: quote.title,
      $audio: quote.audio,
      $text: quote.text,
      $tips: quote.tips,
      $tasks: tasks
    });
  }
  await stmt.finalize();
}