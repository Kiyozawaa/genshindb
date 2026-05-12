import fs from 'node:fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default async function statGrowth(db) {
  await baseStatGrowth(db);
  await secondaryStatGrowth(db);
}

async function baseStatGrowth(db) {
  const folder = join(__dirname, 'curves', 'levelmultipliers', 'base');
  const files = await fs.readdir(folder);
  for (const file of files) {
    const filepath = join(folder, file);
    await insertBaseStatGrowth(filepath, db);
  }
}

async function insertBaseStatGrowth(filepath, db) {
  const stmt = await db.prepare(`
    INSERT INTO weapon_growth_base (level, value, curve)
    VALUES ($level, $value, $curve)`);
  const buffer = await fs.readFile(filepath);
  const data = JSON.parse(buffer.toString());
  for (const key of Object.keys(data)) {
    for (const [level, value] of Object.entries(data[key])) {
      await stmt.run({
        $level: level,
        $value: value,
        $curve: key
      });
    }
  }
  await stmt.finalize();
}

async function secondaryStatGrowth(db) {
  const stmt = await db.prepare(`
    INSERT INTO weapon_growth_secondary (level, value)
    VALUES ($level, $value)`);
  const filepath = join(__dirname, 'curves', 'levelmultipliers', 'secondary.json');
  const buffer = await fs.readFile(filepath);
  const data = JSON.parse(buffer.toString());
  for (const [level, value] of Object.entries(data)) {
    await stmt.run({
      $level: level,
      $value: value
    });
  }
  await stmt.finalize();
}