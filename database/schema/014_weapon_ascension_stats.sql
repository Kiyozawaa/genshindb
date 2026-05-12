CREATE TABLE IF NOT EXISTS weapon_ascension_stats (
  id INTEGER NOT NULL,
  stat TEXT NOT NULL,
  value REAL NOT NULL,
  growth TEXT NOT NULL,
  PRIMARY KEY (id, stat, value, growth),
  FOREIGN KEY (id) REFERENCES weapons(id)
);