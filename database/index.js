import { createTables } from './init.js';
import { seeder } from './seed/index.js'
import db from './db.js';

export default async function initDB() {
  try {
    //Initialize and create the tables
    //await createTables(db);
    await seeder();
  } catch (e) {
    console.log(e);
  }
}