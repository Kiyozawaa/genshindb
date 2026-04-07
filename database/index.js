import { seeder } from './seed/index.js'
import db from './db.js';

export default async function initDB() {
  try {
    await seeder();
  } catch (e) {
    console.log(e);
  }
}