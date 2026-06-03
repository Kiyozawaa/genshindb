CREATE TABLE IF NOT EXISTS character_quotes (
  id INTEGER NOT NULL,
  sid INTEGER NOT NULL,
  title TEXT,
  audio INTEGER,
  text TEXT,
  tips TEXT,
  tasks TEXT,
  PRIMARY KEY (id, sid)
);