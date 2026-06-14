import { useState } from 'react';
import { STAT_MAPPING } from './../utils/mapping.js';

export default function Search({setQuery, filters, setFilters, type}) {
  const [modal, setModal] = useState(false);
  let totalFilters = 0;
  
  return (
    <div className='search'>
      <input className='search__input' type='text' placeholder={`Search ${type}...`} onChange={e => setQuery(e.target.value)}/>
      <button className='search__button' onClick={e => setModal(!modal)}>
        Filters &nbsp; {totalFilters > 0 && <>({totalFilters})</>}
      </button>
      <FilterModal modal={modal} setModal={setModal} filters={filters} setFilters={setFilters}/>
    </div>
  );
}

function FilterModal({modal, setModal, filters, setFilters}) {
  const rarities = [1, 2, 3, 4, 5];
  const types = ['Sword', 'Claymore', 'Polearm', 'Catalyst', 'Bow'];
  const props = {
    'FIGHT_PROP_ELEMENT_MASTERY': 'Elemental Mastery',
    'FIGHT_PROP_CRITICAL_HURT': 'CRIT Dmg',
    'FIGHT_PROP_CRITICAL': 'CRIT Rate',
    'FIGHT_PROP_CHARGE_EFFICIENCY': 'Energy Recharge',
    'FIGHT_PROP_ATTACK_PERCENT': 'ATK %',
    'FIGHT_PROP_HP_PERCENT': 'HP %',
    'FIGHT_PROP_DEFENSE_PERCENT': 'DEF %'
  }
  const totalFilters = filters.rarities.length + filters.types.length + filters.props.length;
  function toggleRarity(rarity) {
    setFilters(prev => ({
      ...prev,
      rarities: prev.rarities.includes(rarity) ? prev.rarities.filter(r => r !== rarity) : [...prev.rarities, rarity]
    }));
  }
  
  function toggleType(type) {
    setFilters(prev => ({
      ...prev,
      types: prev.types.includes(type) ? prev.types.filter(t => t !== type) : [...prev.types, type]
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
      types: [],
      props: []
    });
  }
  
  return (<>
    <div className={`filter-modal-overlay ${modal ? 'filter-modal-overlay__visible' : ''}`} onClick={e => setModal(!modal)}>
      <div className='filter-modal' onClick={e => e.stopPropagation()}>
        <h2 className='filter-modal__header'>Filters</h2>
        <h3 className='filter-modal__title'>Rarity</h3>
        <div className='filter-modal__item-list'>
          {rarities.map(rarity => (
            <div key={rarity} className={`filter-modal__item rarity ${filters.rarities.includes(rarity) ? 'is-selected' : ''}`} onClick={e => toggleRarity(rarity)}>
              {'★'.repeat(rarity)}
            </div>
          ))}
        </div>
        
        <h3 className='filter-modal__title'>Type</h3>
        <div className='filter-modal__item-list'>
          {types.map(type => (
            <div key={type} className={`filter-modal__item weapon ${filters.types.includes(type) ? 'is-selected' : ''}`} onClick={e => toggleType(type)}>
              {type}
            </div>
          ))}
        </div>
        
        <h3 className='filter-modal__title'>Stat</h3>
        <div className='filter-modal__item-list'>
          {Object.entries(props).map(([prop, stat]) => (
            <div key={stat} className={`filter-modal__item weapon ${filters.props.includes(prop) ? 'is-selected' : ''}`} onClick={e => toggleProp(prop)}>
              {stat}
            </div>
          ))}
        </div>
        
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