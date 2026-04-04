CREATE TABLE IF NOT EXISTS character_vas (
  character_id TEXT NOT NULL,
  language TEXT NOT NULL,
  va TEXT NOT NULL,
  PRIMARY KEY (character_id, language),
  FOREIGN KEY (character_id) REFERENCES characters(id)
);