CREATE TABLE IF NOT EXISTS weapon_growth_base (
  level INTEGER NOT NULL,
  value REAL NOT NULL,
  curve TEXT NOT NULL,
  PRIMARY KEY (level, value, curve)
);