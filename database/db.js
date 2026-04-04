import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import 'dotenv/config';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_NAME = process.env.DB_NAME || 'genshin.db';
const filepath = join(__dirname, '..', DB_NAME);

const db = await open({
  filename: filepath,
  driver: sqlite3.Database
});

await db.run('PRAGMA foreign_keys = ON');

export default db;