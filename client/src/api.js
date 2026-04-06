export async function getCharacterList() {
  const conn = await fetch('http://localhost:8004/characters');
  const res = await conn.json(); 
  return res;
}

export async function getCharacter(id) {
  try {
    
  const conn = await fetch(`http://localhost:8004/character/${id}`);
  const res = await conn.json();
  return res;
  } catch (e) {
    console.log(e);
  }
}