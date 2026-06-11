const API = 'http://localhost:8004';

export async function getCharacterList() {
  const conn = await fetch(`${API}/characters`);
  const res = await conn.json(); 
  return res;
}

export async function getCharacter(id) {
  try {
  const conn = await fetch(`${API}/characters/${id}`);
  const res = await conn.json();
  return res;
  } catch (e) {
    console.log(e);
  }
}

export async function getWeaponList() {
  const conn = await fetch(`${API}/weapons`);
  const res = await conn.json();
  return res;
}

export async function getWeapon(id) {
  const conn = await fetch(`${API}/weapons/${id}`);
  const res = await conn.json();
  return res;
}

export async function getHome() {
  const conn = await fetch(`${API}/home`);
  const res = await conn.json();
  return res;
}

export async function getAllMaterials() {
  const conn = await fetch(`${API}/materials`);
  const res = await conn.json();
  return res;
}

export async function getMaterial(id) {
  const conn = await fetch(`${API}/materials/${id}`);
  const res = await conn.json();
  return res;
}

export async function getAllArtifacts() {
  const conn = await fetch(`${API}/artifacts`);
  const res = await conn.json();
  return res;
}

export async function getArtifact(id) {
  const conn = await fetch(`${API}/artifacts/${id}`);
  const res = await conn.json();
  return res;
}