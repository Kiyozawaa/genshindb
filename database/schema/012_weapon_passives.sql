CREATE TABLE IF NOT EXISTS weapon_passives (
  id INTEGER NOT NULL,
  ascension INTEGER NOT NULL,
  description TExT NOT NULL,
  PRIMARY KEY (id, ascension),
  FOREIGN KEY (id) REFERENCES weapons(id)
);