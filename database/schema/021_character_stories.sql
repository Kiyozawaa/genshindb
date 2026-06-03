CREATE TABLE IF NOT EXISTS character_stories (
  sid INTEGER NOT NULL,
  id INTEGER NOT NULL,
  title TEXT,
  title2 TEXT,
  text TEXT,
  text2 TEXT,
  tips TEXT,
  PRIMARY KEY (sid, id)
);