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
  const char = await getCharacterList();
  res.json(char);
});