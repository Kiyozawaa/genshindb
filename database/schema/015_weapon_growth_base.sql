CREATE TABLE IF NOT EXISTS weapon_growth_base (
  rank INTEGER,
  level INTEGER,
  value INTEGER,
  curve TEXT,
  PRIMARY KEY (rank, level, value)
);