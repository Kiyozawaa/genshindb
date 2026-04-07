CREATE TABLE IF NOT EXISTS character_stat_growth (
  stat TEXT NOT NULL,
  level INT NOT NULL,
  value REAL NOT NULL,
  PRIMARY KEY (stat, level)
);