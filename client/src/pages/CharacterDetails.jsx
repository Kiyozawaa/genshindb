import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getCharacter } from './../api.js';

function CharacterDetails() {
  const { id } = useParams();
  const [charData, setCharData] = useState(null);
  
  async function loadCharacterData() {
    const char = await getCharacter(id);
    setCharData(char);
  }
  
  useEffect(() => {
    loadCharacterData();
  }, []);
  
  if (!charData) return <div>Loading...</div>;
  
  return (
    <>
      <BasicInfo charData={charData}/>
      <BaseStats data={charData.baseStats}/>
    </>
  );
}

function BasicInfo({charData}) {
  return (
    <>
    <div className='character-basic-info'>
        <p>Name</p>
        <p>{charData.name}</p>
        <p>Element</p>
        <p>{charData.element}</p>
        <p>Source</p>
        <p>{charData.source}</p>
        <p>Weapon</p>
        <p>{charData.weapon}</p>
        <p>Rarity</p>
        <p>{charData.rarity}</p>
        <p>Birthday</p>
        <p>{charData.birth}</p>
        <p>Constellation</p>
        <p>{charData.constellation}</p>
        <p>Native</p>
        <p>{charData.native}</p>
    </div>
        <p>{charData.description}</p>
    </>
  );
}

function BaseStats({data}) {
  return (
    <div className='base-stats'>
      <p>HP: {data.hp}</p>
      <p>Attack: {data.atk}</p>
      <p>Defense: {data.def}</p>
    </div>
  );
}

export default CharacterDetails;