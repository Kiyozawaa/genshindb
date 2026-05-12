import fs from 'node:fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default async function ascensionStatGrowth(db) {
  const stmt = await db.prepare(`
    INSERT INTO weapon_growth_ascension (rank, ascension, value)
    VALUES ($rank, $ascension, $value)`)
  const filepath = join(__dirname, 'curves', 'ascension.json');
  const buffer = await fs.readFile(filepath);
  const data = JSON.parse(buffer.toString());
  for (const rank of Object.keys(data)) {
    for (const [ascension, value] of Object.entries(data[rank])) {
      await stmt.run({
        $rank: rank,
        $ascension: ascension,
        $value: value
      });
    }
  }
  await stmt.finalize();
}