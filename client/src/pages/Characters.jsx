import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import BackButton from './../components/BackButton.jsx';
import NavBar from './../components/NavBar.jsx';
import { getCharacterList } from './../api.js';
import { ELEMENT_MAPPING } from './../utils/mapping.js';

function Characters() {
  const [charList, setCharList] = useState(null);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({elements: [], rarities: []});
  async function loadCharacterList() {
    const data = await getCharacterList();
    setCharList(data);
  }

  useEffect(() => {
    loadCharacterList();
  }, []);
  
  let result = charList ?? [];
  
  if (query.trim()) {
  result = result.filter(char => char.name.toLowerCase().includes(query.trim().toLowerCase()));
  }
  
  if (filters.rarities.length) {
    result = result.filter(char => filters.rarities.includes(char.rarity));
  }
  
  if (filters.elements.length) {
    result = result.filter(char => filters.elements.includes(char.element));
  }
  
  if (!charList) return 'Loading...';
  
  return (<>
    <BackButton to={'/'} value={'Home'}/>
    
    <SearchBar setQuery={setQuery} filters={filters} setFilters={setFilters}/>
    
    {query.length > 0 &&
      <div className='search__text'>
        {result.length > 0
        ? `Showing ${result.length} character${result.length > 1 ? 's' : ''}.`
        : 'No character found.'}
      </div>
    }
    
    <div className='item-list'>
      {result.map(char => (
        <Item key={char.id} char={char}/>
      ))}
    </div>
  </>);
}

function SearchBar({setQuery, filters, setFilters}) {
  const [modal, setModal] = useState(false);
  const elements = ['Ice', 'Fire', 'Grass', 'Rock', 'Water', 'Electric', 'Wind'];
  const totalFilters = filters.elements.length + filters.rarities.length;
  
  function toggleRarity(rarity) {
    setFilters(prev => ({
      ...prev,
      rarities: prev.rarities.includes(rarity)
      ? prev.rarities.filter(r => r !== rarity)
      : [...prev.rarities, rarity]
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
  
  function resetFilter() {
    setFilters({
      elements: [],
      rarities: []
    });
  }
  
  return (<>
    <div className='search'>
      <input
        className='search__input'
        type='text' placeholder='Search Characters...'
        onChange={e => setQuery(e.target.value)}
      />
      <button className='search__button' onClick={e => setModal(!modal)}>
        Filter
        {totalFilters > 0 && <>({totalFilters})</>}
        </button>
      <div
      className={`filter-modal-overlay ${modal ? 'filter-modal-overlay__visible' : ''}`}
      onClick={e => setModal(!modal)}>
        <div className='filter-modal'
        onClick={e => e.stopPropagation()}>
          <h2 className='filter-modal__header'>Filters</h2>
          <h3 className='filter-modal__title'>Rarity</h3>
          <div className='filter-modal__item-list'>
            <div
              className={`filter-modal__item
                ${filters.rarities.includes(4)
                ? 'is-selected-rarity'
                : ''}`
              }
              onClick={e => toggleRarity(4)}
            >
              {`${'★'.repeat(4)}`}
            </div>
            
            <div
              className={`filter-modal__item
                ${filters.rarities.includes(5)
                  ? 'is-selected-rarity' : ''
                }`
              }
              onClick={e => toggleRarity(5)}
            >
            {`${'★'.repeat(5)}`}
            </div>
          </div>
          <h2 className='filter-modal__title'>Elements</h2>
          <div className='filter-modal__item-list'>
          {elements.map(element => (
          <div
            key={element}
            className={`filter-modal__item
            element-${ELEMENT_MAPPING[element].toLowerCase()}
            ${filters.elements.includes(element)
            ? 'is-selected' : ''}`}
            onClick={e => toggleElement(element)}
          > {ELEMENT_MAPPING[element]}
          </div>
          ))}
          </div>
          <button
            className='filter-modal__clear-filters'
            onClick={e => resetFilter()}>
            Clear Filter(s)
          </button>
        </div>
      </div>
    </div>
  </>)
}

function Item({char}) {
  const iconUrl = `https://gi.yatta.moe/assets/UI/`;
  return (
    <Link className='a' to={`/characters/${char.id}`}>
    <div className='item-card'>
      <img
      className='icon'
      src={iconUrl+char.icon+'.png'}/>
      <div className='item-name'>
      {char.name}</div>
        
      </div>
      </Link>
  );
}

export default Characters;