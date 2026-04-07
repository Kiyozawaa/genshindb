CREATE TABLE IF NOT EXISTS character_passives (
  character_id TEXT,
  id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description NOT NULL,
  icon TEXT NOT NULL,
  PRIMARY KEY (character_id, name)
);