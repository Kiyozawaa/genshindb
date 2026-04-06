import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { getCharacter, getCharacterList } from './../repo/characters.repo.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const router = express.Router();

router.get('/', async (req, res) => {
  res.send(`Hello World!`);
});

router.get('/characters', async (req, res) => {
  const charList = await getCharacterList();
  res.json(charList);
});

router.get('/character/:id', async (req, res) => {
  const { id } = req.params;
  const char = await getCharacter(id);
  res.json(char);
});