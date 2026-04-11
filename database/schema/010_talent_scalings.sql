CREATE TABLE IF NOT EXISTS talent_scalings (
  character_id TEXT NOT NULL,
  talent_id INTEGER NOT NULL,
  level INTEGER NOT NULL,
  scaling_data TEXT NOT NULL, --JSON for description, params
  PRIMARY KEY (character_id, talent_id, level),
  FOREIGN KEY (character_id, talent_id)
  REFERENCES character_talents(character_id, id)
  ON DELETE CASCADE
);