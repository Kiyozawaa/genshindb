CREATE TABLE IF NOT EXISTS characters (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  element TEXT NOT NULL,
  source TEXT NOT NULL,
  weapon TEXT NOT NULL,
  rarity INT NOT NULL,
  birth DATE NOT NULL,
  constellation TEXT NOT NULL,
  region TEXT NOT NULL,
  native TEXT NOT NULL,
  description TEXT NOT NULL,
  ascension_stat TEXT NOT NULL
);