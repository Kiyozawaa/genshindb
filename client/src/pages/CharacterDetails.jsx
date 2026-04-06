import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getCharacter } from './../api.js';
import { calcFinalStats } from './../utils/stats/calc.js';

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
      <BaseStats data={charData}/>
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
  const [level, setLevel] = useState(1);
  
  const finalStats = calcFinalStats(data.baseStats, data.statGrowth, level, data.ascensionStats);
  
  return (
    <>
    <div className='base-stats'>
      <p>HP: {Math.round(finalStats.hp)}</p>
      <p>Attack: {Math.round(finalStats.atk)}</p>
      <p>Defense: {Math.round(finalStats.def)}</p>
    </div>
    <input type='range'
    min='1'
    max='90'
    value={level}
    onChange={e => setLevel(e.target.value)}/>
    </>
  );
}

export default CharacterDetails;