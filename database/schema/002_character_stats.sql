CREATE TABLE IF NOT EXISTS character_base_stats (
  character_id TEXT NOT NULL,
  stat TEXT NOT NULL,
  value REAL NOT NULL,
  growth_curve TEXT NOT NULL,
  PRIMARY KEY (character_id, stat),
  FOREIGN KEY (character_id) REFERENCES characters(id)
)