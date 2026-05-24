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

export async function getWeaponList() {
  const conn = await fetch('http://localhost:8004/weapons');
  const res = await conn.json();
  return res;
}

export async function getWeapon(id) {
  const conn = await fetch(`http://localhost:8004/weapon/${id}`);
  const res = await conn.json();
  return res;
}

export async function getHome() {
  const conn = await fetch('http://localhost:8004/home');
  const res = await conn.json();
  return res;
}

export async function getAllMaterials() {
  const conn = await fetch('http://localhost:8004/materials');
  const res = await conn.json();
  return res;
}