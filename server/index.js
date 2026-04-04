import { app } from './app.js';
import initDB from './../database/index.js';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

async function startApp() {
  await initDB();
  app.listen(PORT, () => {
    console.log(`Genshin Database running on http://localhost:${PORT}`);
  });
}

startApp();