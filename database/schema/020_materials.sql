CREATE TABLE IF NOT EXISTS materials (
  id INTEGER NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  rank INTEGER NOT NULL,
  type TEXT,
  recipe TEXT,
  storyId INTEGER,
  mapMark TEXT,
  source TEXT,
  additions TEXT,
  icon TEXT,
  description TEXT
);