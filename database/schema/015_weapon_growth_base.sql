CREATE TABLE IF NOT EXISTS weapon_growth_base (
  rank INTEGER NOT NULL,
  level INTEGER NOT NULL,
  value REAL NOT NULL,
  curve TEXT NOT NULL,
  PRIMARY KEY (rank, level, value)
);