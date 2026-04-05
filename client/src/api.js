export async function getCharacterList() {
  const conn = await fetch('http://localhost:8004/characters');
  const res = await conn.json(); 
  return res;
}