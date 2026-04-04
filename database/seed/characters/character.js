import { characterDetails } from './details.js';
import stats from './stats.js';
import db from './../../db.js';

export async function seedCharacters(character) {
  //await characterDetails(db, character.data);
  await stats(db, character.data.upgrade, character.data.id);
}