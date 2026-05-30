import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import NavBar from './../components/NavBar.jsx';
import { getCharacter, getMaterial } from './../api.js';
import { calcFinalStats, ascensionUpgradeCost, getAscension } from './../utils/stats/calc.js';
import { parseDescription, parseTalent } from './../utils/parseText.js';

const iconURL = 'https://gi.yatta.moe/assets/UI/';

function CharacterDetails() {
  const { id } = useParams();
  const [charData, setCharData] = useState(null);
  const [level, setLevel] = useState(90);
  
  async function loadCharacterData() {
    const char = await getCharacter(id);
    setCharData(char);
  }
  
  useEffect(() => {
    loadCharacterData();
  }, []);
  
  if (!charData) return <div>Loading...</div>;
  
  return (
    <div className='content'>
      <BasicInfo charData={charData} />
      <BaseStats data={charData} level={level} setLevel={setLevel} />
      <CharacterAscensionCost data={charData.ascension} level={level}/>
      <Talents data={charData.talents} />
      <Passives data={charData.passives} />
      <Constellations data={charData.constellations} />
      <NavBar/>
    </div>
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

function BaseStats({data, level, setLevel}) {
  const finalStats = calcFinalStats(data.baseStats, data.statGrowth, level, data.ascension, data.ascension_stat);
  const levels = [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 100];
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

function CharacterAscensionCost({data, level}) {
  const cost = data[getAscension(level)] ?? null;
  if (!cost.coinCost) return <div className='passive'><center>No items needed to upgrade</center></div>

  return (<>
    <div className='passive'>
    <div className='item-list'>
    {Object.entries(cost.costItems).map(([id, value]) => (
    <Link class='a' to={`/material/${id}`}>
      <div className='item-card'>
        <img className='icon' src={iconURL+'UI_ItemIcon_'+id+'.png'}/>
        <div className='item-name'>{value}</div>
      </div>
      </Link>
    ))}
    </div>
    <div className='center'>
      Required:
      <img className='icon mini' src={iconURL+'UI_ItemIcon_202.png'}/>
      {cost.coinCost}
      </div>
    </div>
  </>)
}

function  Talents({data}) {
  return (
    <>
      <h2 className='details-header'>Talents</h2>
      {data.map(t => (
      <div className='passive'
      key={t.id}>
      <div className='skill-name'>
        <img className='skill-icon' src={iconURL+t.icon+'.png'}/>
        <h3>{t.name}</h3>
      </div>
      <p dangerouslySetInnerHTML={{ __html : parseDescription(t.description)}} />
      <TalentScaling data={t.promote}/>
      </div>
      ))}
    </>
  );
}

function TalentScaling({data}) {
  const [level, setLevel] = useState(9);
  let parsed;
  const len = Object.entries(data).length;
  if (len > 1) {
    parsed = parseTalent(data[level]);
  } else {
    parsed = parseTalent(data[1]);
  }
  return (
    <>
      <div className='talent-slider'>
        <strong>Attributes</strong>
        {len > 1 &&
        <>
        <p>Level: {level}</p>
        <input type='range' value={level} onChange={e => setLevel(e.target.value)} min={1} max={15}/>
        </>}
      </div>
      <div className='talent-scaling'>
      {Object.entries(parsed).map(([k, v]) => (
      <>
        <div
        key={k + 'name'}
        className='talent-scaling-name'>
          {k}
        </div>
        <div
        key={k + 'value'}
        className='talent-scaling-value'>
          {v}
        </div>
      </>
      ))}
      </div>
    </>
  );
}

function Passives({data}) {
  return (
    <>
    <h2 className='details-header'>Passives</h2>
    {data.map(p => (
    <div className='passive' key={p.id}>
      <div className='skill-name'>
      <img className='skill-icon' src={iconURL+p.icon+'.png'}/>
      <h3>{p.name}</h3>
      </div>
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