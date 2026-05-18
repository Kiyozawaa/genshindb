CREATE TABLE IF NOT EXISTS character_upgrade_cost (
  id TEXT NOT NULL,
  ascension INTEGER NOT NULL,
  costItems TEXT,
  unlockMaxLevel INTEGER,
  requiredPlayerLevel INTEGER,
  coinCost INTEGER,
  PRIMARY KEY (id, ascension),
  FOREIGN KEY (id) REFERENCES characters(id)
);