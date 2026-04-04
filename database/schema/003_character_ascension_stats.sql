CREATE TABLE IF NOT EXISTS character_ascension_stats (
  character_id TEXT NOT NULL,
  stat TEXT NOT NULL,
  value REAL NOT NULL,
  ascension INT NOT NULL,
  PRIMARY KEY (character_id, stat, ascension),
  FOREIGN KEY (character_id) REFERENCES characters(id)
);