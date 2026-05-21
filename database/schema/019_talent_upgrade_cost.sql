CREATE TABLE IF NOT EXISTS talent_upgrade_cost (
  character_id TEXT NOT NULL,
  talent_id INTEGER NOT NULL,
  level INTEGER NOT NULL,
  costItems TEXT,
  coinCost INTEGER,
  PRIMARY KEY (character_id, talent_id, level),
  FOREIGN KEY (character_id)
  REFERENCES characters(id)
  ON DELETE CASCADE
);