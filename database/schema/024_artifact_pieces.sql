CREATE TABLE IF NOT EXISTS artifact_pieces (
  id INTEGER,
  type TEXT,
  name TEXT,
  description TEXT,
  maxLevel INTEGER,
  icon TEXT,
  PRIMARY KEY (id, type),
  FOREIGN KEY (id) REFERENCES artifacts(id)
);