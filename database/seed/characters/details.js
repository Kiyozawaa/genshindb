
export async function characterDetails(db, data) {
  const {
    id,
    name,
    weaponType: weapon,
    rank: rarity,
    birthday: birthArray,
    region,
    specialProp: ascensionStat,
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
    INSERT INTO characters (id, name, element, source, weapon, rarity, birth, constellation, region, native, description, ascension_stat)
    VALUES ($id, $name, $element, $source, $weapon, $rarity, $birth, $constellation, $region, $native, $description, $ascensionStat)
  `,
  { $id: id,
    $name: name,
    $element: element,
    $source: source,
    $weapon: weapon,
    $rarity: rarity,
    $birth: birth,
    $constellation: constellation,
    $region: region,
    $native: native,
    $description: description,
    $ascensionStat: ascensionStat }
  );
}


export async function characterVAs(db, data, characterId) {
  const stmt = await db.prepare(`
    INSERT INTO character_vas (character_id, language, va)
    VALUES ($characterId, $language, $va)`);
  
  for (const [lang, va] of Object.entries(data)) {
    await stmt.run({
      $characterId: characterId,
      $language: lang,
      $va: va
    });
  }
  await stmt.finalize();
}