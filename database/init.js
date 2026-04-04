import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import fs from 'node:fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function createTables(db) {
  const schemaDir = join(__dirname, 'schema');
  const allFiles = await fs.readdir(schemaDir);
  const files = allFiles.filter(file => file.endsWith('.sql')).sort();
  for (const file of files) {
    const sql = await fs.readFile(join(schemaDir, file), 'utf-8');
    await db.exec(sql);
    console.log(`Executed ${file}`);
  }
}