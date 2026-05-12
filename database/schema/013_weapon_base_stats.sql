CREATE TABLE IF NOT EXISTS weapon_base_stats (
  id INTEGER NOT NULL,
  stat TEXT NOT NULL,
  value TEXT NOT NULL,
  PRIMARY KEY (id, stat, value),
  FOREIGN KEY (id) REFERENCES weapons(id)
);