import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getCharacter } from './../api.js';
import { calcFinalStats } from './../utils/stats/calc.js';
import { parseDescription } from './../utils/parseText.js';

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
      <BasicInfo charData={charData} />
      <BaseStats data={charData} />
      <Talents data={charData.talents} />
      <Passives data={charData.passives} />
      <Constellations data={charData.constellations} />
    </>
  );
}

function BasicInfo({charData}) {
  return (
    <>
      <h2 className='details-header'>Profile</h2>
    <div className='character-info'>
      <div className='stat'>
        <div className='stat-label'>Name</div>
        <div className='stat-value'>{charData.name}</div>
      </div>
      <div className='stat'>
        <div className='stat-label'>Element</div>
        <div className='stat-value'>{charData.element}</div>
      </div>
      <div className='stat'>
        <div className='stat-label'>Source</div>
        <div className='stat-value'>{charData.source}</div>
      </div>
      <div className='stat'>
        <div className='stat-label'>Weapon</div>
        <div className='stat-value'>{charData.weapon}</div>
      </div>
      <div className='stat'>
        <div className='stat-label'>Rarity</div>
        <div className='stat-value'>{charData.rarity}</div>
      </div>
      <div className='stat'>
        <div className='stat-label'>Birthday</div>
        <div className='stat-value'>{charData.birth}</div>
      </div>
      <div className='stat'>
        <div className='stat-label'>Constellation</div>
        <div className='stat-value'>{charData.constellation}</div>
      </div>
      <div className='stat'>
        <div className='stat-label'>Native</div>
        <div className='stat-value'>{charData.native}</div>
      </div>
        <div className='description'>{charData.description}</div>
    </div>
    </>
  );
}

function BaseStats({data}) {
  const [level, setLevel] = useState(90);
  const levels = [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 100];
  const finalStats = calcFinalStats(data.baseStats, data.statGrowth, level, data.ascensionStats, data.ascension_stat);
  
  return (
    <>
      <h2 className='details-header'>Base Stats</h2>
    <div className='character-info'>
      <div className='stat'>
        <div className='stat-label'>HP</div>
        <div className='stat-value'>{Math.round(finalStats.hp)}</div>
      </div>
      <div className='stat'>
        <div className='stat-label'>Attack</div>
        <div className='stat-value'>{Math.round(finalStats.atk)}</div>
      </div>
      <div className='stat'>
        <div className='stat-label'>Defense</div>
        <div className='stat-value'>{Math.round(finalStats.def)}</div>
      </div>
      <div className='stat'>
        <div className='stat-label'>{finalStats.ascension.stat}</div>
        <div className='stat-value'>{(finalStats.ascension.value).toFixed(1) ?? 0}</div>
      </div>
    </div>
    <div className='level-slider'>
      <div className='header'>Level: {level}</div>
      <input type='range'
      min={0}
      max={levels.length - 1}
      step={1}
      value={levels.indexOf(level)}
      onChange={e => setLevel(levels[e.target.value])}/>
      </div>
      </>
  );
}

function  Talents({data}) {
  return (
    <>
      <h2 className='details-header'>Talents</h2>
      {data.map(t => (
      <div className='passive'
      key={t.id}>
      <h3>{t.name}</h3>
      <p dangerouslySetInnerHTML={{ __html : parseDescription(t.description)}} />
      </div>
      ))}
    </>
  );
}

function Passives({data}) {
  return (
    <>
    <h2 className='details-header'>Passives</h2>
    {data.map(p => (
    <div className='passive' key={p.id}>
      <h3>{p.name}</h3>
      <p dangerouslySetInnerHTML={{ __html : parseDescription(p.description)}} />
    </div>
    ))}
    </>
  );
}

function Constellations({data}) {
  return (
    <>
      <h2 className='details-header'>Constellations</h2>
      {data.map((c, i) => (
      <div className='passive'
      key={c.id}>
        <h3>{i+1}. {c.name}</h3>
        <p dangerouslySetInnerHTML={{ __html: parseDescription(c.description)}}/>
      </div>
      ))}
    </>
  );
}
export default CharacterDetails;