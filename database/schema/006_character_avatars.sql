CREATE TABLE IF NOT EXISTS character_avatars (
  character_id TEXT NOT NULL,
  type TEXT NOT NULL,
  uri TEXT NOT NULL,
  PRIMARY KEY (character_id, type),
  FOREIGN KEY (character_id) REFERENCES characters(id)
);