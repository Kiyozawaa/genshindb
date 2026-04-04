
export async function characterDetails(db, data) {
  const {
    id,
    name,
    weaponType: weapon,
    rank: rarity,
    birthday: birthArray,
    fetter: {
      constellation,
      native,
      detail: description
    }
  } = data;
  const element = data.element || '-';
  const source = 'Vision';
  const [birthMonth, birthDate] = birthArray;
  const birth = `${birthMonth}/${birthDate}`;

  //console.log({id, name, element, source, weapon, rarity, birth, constellation, native, description})
  
  await db.run(`
    INSERT INTO characters (id, name, element, source, weapon, rarity, birth, constellation, native, description)
    VALUES ($id, $name, $element, $source, $weapon, $rarity, $birth, $constellation, $native, $description)
  `,
  { $id: id,
    $name: name,
    $element: element,
    $source: source,
    $weapon: weapon,
    $rarity: rarity,
    $birth: birth,
    $constellation: constellation,
    $native: native,
    $description: description }
  );
}