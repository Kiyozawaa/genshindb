CREATE TABLE IF NOT EXISTS character_stat_growth (
  character_id TEXT NOT NULL,
  stat TEXT NOT NULL,
  value REAL NOT NULL,
  level INT NOT NULL,
  PRIMARY KEY (character_id, stat, level),
  FOREIGN KEY (character_id) REFERENCES characters(id)
);