import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import fs from 'node:fs/promises';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import 'dotenv/config';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_NAME = process.env.DB_NAME || 'genshin.db';
const filepath = join(__dirname, '..', DB_NAME);

const db = await open({
  filename: filepath,
  driver: sqlite3.Database
});

await db.run('PRAGMA foreign_keys = ON');

async function createTables(db) {
  const schemaDir = join(__dirname, 'schema');
  const allFiles = await fs.readdir(schemaDir);
  const files = allFiles.filter(file => file.endsWith('.sql')).sort();
  for (const file of files) {
    const sql = await fs.readFile(join(schemaDir, file), 'utf-8');
    await db.exec(sql);
    console.log(`Executed ${file}`);
  }
}

await createTables(db);