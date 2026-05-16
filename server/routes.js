import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { getCharacter, getCharacterList, homepage } from './../repo/characters.repo.js';
import { getWeapon, getWeaponList } from './../repo/weapons.repo.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const router = express.Router();

router.get('/characters', async (req, res) => {
  const charList = await getCharacterList();
  res.json(charList);
});

router.get('/character/:id', async (req, res) => {
  const { id } = req.params;
  const char = await getCharacter(id);
  res.json(char);
});


router.get('/weapons', async (req, res) => {
  const wepList = await getWeaponList();
  res.json(wepList);
});

router.get('/weapon/:id', async (req, res) => {
  const { id } = req.params;
  const wep = await getWeapon(id);
  res.json(wep);
});

router.get('/home', async (req, res) => {
  const [bdays, newChars] = await homepage();
  const data = { bdays, newChars };
  res.json(data);
});