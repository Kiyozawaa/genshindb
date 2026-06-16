import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import BackButton from './../components/BackButton.jsx';
import { getWeapon } from './../api.js';
import { STAT_MAPPING } from './../utils/mapping.js';
import { calcBaseStat, calcSecondaryStat } from './../utils/stats/calcWep.js';
import { parseDescription } from './../utils/parseText.js';

function WeaponDetails() {
  const { id } = useParams();
  const [weapon, setWeapon] = useState(null);
  const [active, setActive] = useState('Details');

  async function loadWeaponData() {
    const wepData = await getWeapon(id);
    setWeapon(wepData);
  }
  
  useEffect(() => {
    loadWeaponData();
  }, []);
  
  if (!weapon) return <div>Loading...</div>;
  
  return (<>
    <BackButton to='/weapons' value='Weapons'/>
    <WeaponProfile weapon={weapon}/>
    <WeaponNavBar active={active} setActive={setActive}/>
    {active === 'Details' && <>
      <BasicInfo data={weapon}/>
      <Passives data={weapon.passives}/>
      <div className='item__description'>{weapon.description}</div>
    </>}
  </>);
}

function WeaponProfile({weapon}) {
  const assetURL = 'https://gi.yatta.moe/assets/UI/';
  const weaponIcon = ('UI_GachaTypeIcon_' + weapon.type).replace(/Polearm/, 'Pole');
  return (<>
    <div className='item-profile'>
      <img className='item-profile__avatar-weapon' src={assetURL+weapon.icon+'.png'}/>
      <div className='item-profile__name'>{weapon.name}</div>
      <div className='item-profile__rarity'>{'★'.repeat(weapon.rank)}</div>
      <div className='item-profile__weapon'>
        <img className='item-profile__icon' src={assetURL + weaponIcon + '.png'}/>
        {weapon.type}
      </div>
    </div>
  </>)
}

function WeaponNavBar({active, setActive}) {
  const items = ['Details', 'Story'];

  return (<>
    <div className='item-navbar'>
    {items.map(item => (
      <div key={item} className={`item-navbar__item ${active === item ? 'is-active' : ''}`} onClick={e => setActive(item)}>{item}</div>
    ))}
    </div>
  </>)
}

function BasicInfo({data}) {
  const [level, setLevel] = useState(90);
  const baseStat = calcBaseStat(data.stats.base, data.growth.ascension, data.growth.base, level);;
  let secondaryStat;
  if (data.rank > 2) {
    secondaryStat = calcSecondaryStat(data.stats.secondary, data.growth.secondary, level);
  }
  return (
  <>
    <div className='item-info'>
      
      <div className='item-stat'>
        <div className='item-stat__label'>Base ATK</div>
        <div className='item-stat__value'>{baseStat}</div>
      </div>
      
      {(data.specialProp !== 'None') &&
      <div className='item-stat'>
        <div className='item-stat__label'>{STAT_MAPPING[data.specialProp]}</div>
        <div className='item-stat__value'>{secondaryStat}</div>
      </div>
      }

    <LevelSlider level={level} setLevel={setLevel} />
    
    </div>
  </>
  );
}

function Passives({data}) {
  if (data.length < 1) return;
  const [refinement, setRefinement] = useState(1);
  return (
    <>
      <div className='item-section'>
        <h2 className='item-section__title big'>Passive</h2>
        <div className='item-section__grid'>
          {[1, 2, 3, 4, 5].map(n => (
          <div key={n}
          className={`item-section__grid-box ${refinement === n ? 'is-active' : ''}`}
          onClick={() => setRefinement(n)}>{n}</div>
          ))}
        </div>
        <p className='item-section__text' dangerouslySetInnerHTML={{ __html: parseDescription(data[refinement - 1].description)}}/>
      </div>
    </>
  )
}

function LevelSlider({level, setLevel}) {
  const levels = [1, 10, 20, 30, 40, 50, 60, 70, 80, 90];
  return (
    <>
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

export default WeaponDetails;
