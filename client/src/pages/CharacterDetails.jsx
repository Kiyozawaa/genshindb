import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import BackButton from './../components/BackButton.jsx';
import { getCharacter, getMaterial } from './../api.js';
import { calcFinalStats, getAscension } from './../utils/stats/calc.js';
import { parseDescription, parseTalent } from './../utils/parseText.js';
import { REV_ELEMENT_MAPPING } from './../utils/mapping.js';
import './../style/character-details.css';

const assetURL = 'https://gi.yatta.moe/assets/UI/';

function CharacterDetails() {
  const { id } = useParams();
  const [charData, setCharData] = useState(null);
  const [level, setLevel] = useState(90);
  const [active, setActive] = useState('Profile');
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
      <BackButton to='/characters' value='Characters'/>
      <CharacterCard char={charData}/>
      <CharacterNavBar active={active} setActive={setActive}/>
      
      {active === 'Profile' &&
      <>
        <BaseStats data={charData} level={level} setLevel={setLevel} />
        <CharacterAscensionCost data={charData.ascension} level={level}/>
      </>}
      
      {active === 'Talents' &&
      <Talents data={charData.talents}/>}
      
      {active === 'Passives' &&
      <Passives data={charData.passives}/>}
      
      {active === 'Constellations' &&
      <Constellations data={charData.constellations}/>}
      
      {active === 'Stories' && 
      <Story data={charData.story}/>}
      
      {active === 'Dialogues' &&
      <Quotes data={charData.quotes}/>}

    </div>
  );
}

function CharacterCard({char}) {
  const avatarIcon = char.icon.replace(/UI_AvatarIcon_/, 'UI_Gacha_AvatarImg_');
  const elementIcon = 'UI_Buff_Element_' + REV_ELEMENT_MAPPING[char.element];
  const weaponIcon = ('UI_GachaTypeIcon_' + char.weapon).replace(/Polearm/, 'Pole');
  return (
  <div className='character-intro'>
    <img className='character-intro__avatar' src={assetURL+avatarIcon+'.png'}/>
    <div className='character-intro__name'>
      <img className='character-intro__icon' src={assetURL+elementIcon+'.png'}/>
      {char.name}
    </div>
    <div className='character-intro__rarity'>
      {'★'.repeat(char.rarity)}
    </div>
    <div className='character-intro__weapon'>
      <img className='character-intro__icon' src={assetURL+weaponIcon+'.png'}/>
      {char.weapon}
    </div>
  </div>
  )
}

function CharacterNavBar({active, setActive}) {
  const navbarItems = ['Profile', 'Talents', 'Passives', 'Constellations', 'Stories', 'Dialogues'];
  return (<>
    <div className='character-navbar'>
      {navbarItems.map(item => (
      <div
      key={item}
      className={`character-navbar__item ${active === item ? 'character-navbar__item--active' : ''}`}
      onClick={(e => setActive(item))}
      >
        {item}
      </div>
      ))}
    </div>
  </>)
}

function BaseStats({data, level, setLevel}) {
  const finalStats = calcFinalStats(data.baseStats, data.statGrowth, level, data.ascension, data.ascension_stat);
  const levels = [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 100];
  return (
    <>
    <div className='character-info'>
    <div className='character__description'>{data.description}</div>
      <div className='character-stat'>
        <div className='character-stat__label'>HP</div>
        <div className='character-stat__value'>{Math.round(finalStats.hp)}</div>
      </div>
      <div className='character-stat'>
        <div className='character-stat__label'>Attack</div>
        <div className='character-stat__value'>{Math.round(finalStats.atk)}</div>
      </div>
      <div className='character-stat'>
        <div className='character-stat__label'>Defense</div>
        <div className='character-stat__value'>{Math.round(finalStats.def)}</div>
      </div>
      <div className='character-stat'>
        <div className='character-stat__label'>{finalStats.ascension.stat}</div>
        <div className='character-stat__value'>{(finalStats.ascension.value).toFixed(1) ?? 0}</div>
      </div>
      <div className='character-stat'>
        <div className='character-stat__label'>Birthday</div>
        <div className='character-stat__value'>{data.birth}</div>
      </div>
      <div className='character-stat'>
        <div className='character-stat__label'>Constellation</div>
        <div className='character-stat__value'>{data.constellation}</div>
      </div>
      <div className='character-stat'>
        <div className='character-stat__label'>Native</div>
        <div className='character-stat__value'>{data.native}</div>
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
  const cost = data[getAscension(level)] || null;
  if (!cost.coinCost) return <div className='character-section'><center>No items needed to upgrade</center></div>

  return (<>
    <div className='character-section'>
    <div className='item-list'>
    {Object.entries(cost.costItems).map(([id, value]) => (
    <Link key={id} className='a' to={`/material/${id}`}>
      <div className='item-card small'>
        <img className='icon small' src={assetURL+'UI_ItemIcon_'+id+'.png'}/>
        <div className='item-name small'>{value}</div>
      </div>
      </Link>
    ))}
    </div>
    <div className='center'>
      Required:
      <img className='icon mini' src={assetURL+'UI_ItemIcon_202.png'}/>
      {cost.coinCost}
      </div>
    </div>
  </>)
}

function  Talents({data}) {
  return (
    <>
      {data.map(t => (
      <div className='character-section'
      key={t.id}>
      <div className='skill__name'>
        <img className='skill__icon' src={assetURL+t.icon+'.png'}/>
        <div className='character-section__title'>{t.name}</div>
      </div>
      <div className='character-section__text' dangerouslySetInnerHTML={{ __html : parseDescription(t.description)}} />
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
      {Object.entries(parsed).map(([hit, value]) => (
      <>
      <div className='talent-scaling'>
        <div
        key={hit + 'name'}
        className='talent-scaling__name'>
          {hit}
        </div>
        <div
        key={hit + 'value'}
        className='talent-scaling__value'>
          {value}
        </div>
      </div>
      </>
      ))}
    </>
  );
}

function Passives({data}) {
  return (
    <>
    {data.map(passive => (
    <div className='character-section' key={passive.id}>
      <div className='skill__name'>
      <img className='skill__icon' src={assetURL+passive.icon+'.png'}/>
      <div className='character-section__title'>{passive.name}</div>
      </div>
      <div className='character-section__text' dangerouslySetInnerHTML={{ __html : parseDescription(passive.description)}} />
    </div>
    ))}
    </>
  );
}

function Constellations({data}) {
  return (
    <>
      {data.map((constellation, i) => (
      <div className='character-section'
      key={constellation.id}>
        <div className='character-section__title'>{i+1}. {constellation.name}</div>
        <div className='character-section__text' dangerouslySetInnerHTML={{ __html: parseDescription(constellation.description)}}/>
      </div>
      ))}
    </>
  );
}

function Story({data}) {
  if (!data?.length) return null;
  return (<>
    <div className='character-profile'>
    {data.map(story => (
    <div key={story.sid}>
      <h2 className='character-profile__header'>
        {story.title}
      </h2>

      {story.tips &&
      <p className='character-profile__requirement'>
      {story.tips}
      </p>}
      <div className='character-profile__text' dangerouslySetInnerHTML={{ __html: parseDescription(story.text)}}/>
    </div>
    ))}
    </div>
  </>)
}

function Quotes({data}) {
  if (!data?.length) return null;
  return (<>
    <div className='character-profile'>
      {data.map(quote => (
      <div key={quote.sid}>
        <h3 className='character-profile__header'>
          {quote.title}
        </h3>
        {quote.tips && <p className='character-profile__requirement'>{quote.tips}</p>}
        <div className='character-profile__text' dangerouslySetInnerHTML={{ __html: parseDescription(quote.text)}}/>
      </div>
      ))}
    </div>
  </>)
}

export default CharacterDetails;