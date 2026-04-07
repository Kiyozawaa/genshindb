import { characterDetails, characterVAs } from './details.js';
import stats from './stats.js';
import avatar from './avatar.js';
import passives from './passives.js';
import db from './../../db.js';

export async function seedCharacters(character) {
  await characterDetails(db, character.data);
  await stats(db, character.data.upgrade, character.data.id);
  await characterVAs(db, character.data.fetter.cv, character.data.id);
  await avatar(db, character.data);
  await passives(db, character.data);
}