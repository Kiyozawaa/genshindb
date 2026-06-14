import { useState } from 'react';
import { STAT_MAPPING, ELEMENT_MAPPING } from './../utils/mapping.js';

export default function Search({setQuery, filters, setFilters, type}) {
  const [modal, setModal] = useState(false);
  const [totalFilters, setTotalFilters] = useState(0);

  return (
    <div className='search'>
      <input className='search__input' type='text' placeholder={`Search ${type}...`} onChange={e => setQuery(e.target.value)}/>
      <button className='search__button' onClick={e => setModal(!modal)}>
        Filters &nbsp; {totalFilters > 0 && <>({totalFilters})</>}
      </button>
      <FilterModal type={type} modal={modal} setModal={setModal} filters={filters} setFilters={setFilters} totalFilters={totalFilters} setTotalFilters={setTotalFilters}/>
    </div>
  );
}

function FilterModal({type, modal, setModal, filters, setFilters, totalFilters, setTotalFilters}) {
  const filterType = type.toLowerCase();
  const rarities = {
    weapon: [1, 2, 3, 4, 5],
    character: [4, 5]
  };
  const elements = ['Ice', 'Fire', 'Grass', 'Rock', 'Water', 'Electric', 'Wind'];
  const weaponTypes = ['Sword', 'Claymore', 'Polearm', 'Catalyst', 'Bow'];
  const props = {
    'FIGHT_PROP_ELEMENT_MASTERY': 'Elemental Mastery',
    'FIGHT_PROP_CRITICAL_HURT': 'CRIT Dmg',
    'FIGHT_PROP_CRITICAL': 'CRIT Rate',
    'FIGHT_PROP_CHARGE_EFFICIENCY': 'Energy Recharge',
    'FIGHT_PROP_ATTACK_PERCENT': 'ATK %',
    'FIGHT_PROP_HP_PERCENT': 'HP %',
    'FIGHT_PROP_DEFENSE_PERCENT': 'DEF %'
  }
  setTotalFilters(filters.rarities?.length + (filters.elements?.length ?? 0) + (filters.weaponTypes?.length ?? 0) + (filters.props?.length ?? 0));

  function toggleRarity(rarity) {
    setFilters(prev => ({
      ...prev,
      rarities: prev.rarities.includes(rarity) ? prev.rarities.filter(r => r !== rarity) : [...prev.rarities, rarity]
    }));
  }
  
  function toggleElement(element) {
    setFilters(prev => ({
      ...prev,
      elements: prev.elements.includes(element)
      ? prev.elements.filter(e => e !== element)
      : [...prev.elements, element]
    }));
  }
  
  function toggleWeaponType(type) {
    setFilters(prev => ({
      ...prev,
      weaponTypes: prev.weaponTypes.includes(type) ? prev.weaponTypes.filter(t => t !== type) : [...prev.weaponTypes, type]
    }));
  }
  
  function toggleProp(prop) {
    setFilters(prev => ({
      ...prev,
      props: prev.props.includes(prop) ? prev.props.filter(p => p !== prop) : [...prev.props, prop]
    }));
  }
  
  function resetFilter() {
    setFilters({
      rarities: [],
      elements: [],
      weaponTypes: [],
      props: []
    });
  }
  
  return (<>
    <div className={`filter-modal-overlay ${modal ? 'filter-modal-overlay__visible' : ''}`} onClick={e => setModal(!modal)}>
      <div className='filter-modal' onClick={e => e.stopPropagation()}>
        <h2 className='filter-modal__header'>Filters</h2>
        <h3 className='filter-modal__title'>Rarity</h3>
        <div className='filter-modal__item-list'>
          {rarities[filterType].map(rarity => (
            <div key={rarity} className={`filter-modal__item rarity ${filters.rarities.includes(rarity) ? 'is-selected' : ''}`} onClick={e => toggleRarity(rarity)}>
              {'★'.repeat(rarity)}
            </div>
          ))}
        </div>
        
        {filterType === 'character' && <>
          <h2 className='filter-modal__title'>Elements</h2>
          <div className='filter-modal__item-list'>
            {elements.map(element => (
              <div key={element} className={`filter-modal__item element-${ELEMENT_MAPPING[element].toLowerCase()} ${filters.elements.includes(element) ? 'is-selected' : ''}`} onClick={e => toggleElement(element)}>
                {ELEMENT_MAPPING[element]}
          </div>
          ))}
          </div>
        </>}
        
        <h3 className='filter-modal__title'>Type</h3>
        <div className='filter-modal__item-list'>
          {weaponTypes.map(type => (
            <div key={type} className={`filter-modal__item weapon ${filters.weaponTypes?.includes(type) ? 'is-selected' : ''}`} onClick={e => toggleWeaponType(type)}>
              {type}
            </div>
          ))}
        </div>

        {filterType === 'weapon' &&
        <>
          <h3 className='filter-modal__title'>Stat</h3>
          <div className='filter-modal__item-list'>
            {Object.entries(props).map(([prop, stat]) => (
              <div key={stat} className={`filter-modal__item weapon ${filters.props.includes(prop) ? 'is-selected' : ''}`} onClick={e => toggleProp(prop)}>
                {stat}
              </div>
            ))}
          </div>
        </>
        }
        <div className='filter-modal__actions'>
          {totalFilters > 0 &&
            <div className='filter-modal__actions-clear-filters' onClick={e => resetFilter()}>
              Clear Filter(s)
            </div>
          }
        </div>
      </div>
    </div>
  </>)
}