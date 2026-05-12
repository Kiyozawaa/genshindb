CREATE TABLE IF NOT EXISTS weapon_growth_ascension (
  rank INTEGER NOT NULL,
  ascension INTEGER NOT NULL,
  value REAL NOT NULL,
  PRIMARY KEY (rank, level, value)
);