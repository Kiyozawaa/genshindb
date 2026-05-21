import { characterDetails, characterVAs } from './details.js';
import stats from './stats.js';
import avatar from './avatar.js';
import talents from './talents.js';
import constellations from './constellations.js';
import upgradeCost from './upgradeCost.js';
import db from './../../db.js';

export async function seedCharacters(character) {
  await characterDetails(db, character.data);
  await stats(db, character.data.upgrade, character.data.id);
  await characterVAs(db, character.data.fetter.cv, character.data.id);
  await avatar(db, character.data);
  await passives(db, character.data.talent);
  await constellations(db, character.data.constellation, character.data.id);
  await talents(db, character.data.talent, character.data.id);
  await upgradeCost(db, character);
}