import { Link } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import BackButton from './../components/BackButton.jsx';
import SearchBar from './../components/SearchBar.jsx';
import { getCharacterList } from './../api.js';
import { ELEMENT_MAPPING, WEAPON_MAPPING } from './../utils/mapping.js';

function Characters() {
  const [charList, setCharList] = useState(null);
  const [visible, setVisible] = useState(52);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    elements: [],
    rarities: [],
    weaponTypes: []
  });
  
  async function loadCharacterList() {
    const data = await getCharacterList();
    setCharList(data);
  }

  useEffect(() => {
    loadCharacterList();
  }, []);
  
  if (!charList) return 'Loading...';
  
  let result = charList?.sort((a, b) => b.rarity - a.rarity);
  
  if (query.trim()) {
  result = result.filter(char => char.name.toLowerCase().includes(query.trim().toLowerCase()));
  }
  
  if (filters.rarities.length) {
    result = result.filter(char => filters.rarities.includes(char.rarity));
  }
  
  if (filters.elements.length) {
    result = result.filter(char => filters.elements.includes(char.element));
  }
  
  if (filters.weaponTypes.length) {
    result = result.filter(char => filters.weaponTypes.includes(WEAPON_MAPPING[char.weapon]))
  }
  
  const total = result?.length;
  const showCount = result.length !== charList.length;
  let visibleItems = result.slice(0, visible);
  
  return (<>
    <BackButton to={'/'} value={'Home'}/>
    
    <SearchBar setQuery={setQuery} filters={filters} setFilters={setFilters} type='Character'/>
    
    {showCount &&
      <div className='search__text'>
        {result.length
        ? `Showing ${result.length} character${result.length > 1 ? 's' : ''}.`
        : 'No character found.'}
      </div>
    }
    
    <div className='item-list'>
      {visibleItems.map(char => (
        <Item key={char.id} char={char}/>
      ))}
    </div>
    <LoadMoreItems visible={visible} setVisible={setVisible} total={total}/>
  </>);
}

function Item({char}) {
  const assetURL = `https://gi.yatta.moe/assets/UI/`;
  const elementIcon = 'UI_Buff_Element_' + char.element;
  const weaponIcon = ('UI_GachaTypeIcon_' + WEAPON_MAPPING[char.weapon]).replace(/Polearm/, 'Pole');
  return (
    <Link className='item-card__link' to={`/characters/${char.id}`}>
    <div className='item-card'>
      <div className='item-card__image-container'>
        <img className='item-card__element'
        src={assetURL+elementIcon+'.png'}/>
        <img className='item-card__weapon'
        src={assetURL+weaponIcon+'.png'}/>
        <img
        className={`item-card__icon rarity-${char.rarity}`}
        src={assetURL+char.icon+'.png'}/>
      </div>
      <div className='item-card__name'>
      {char.name}</div>
        
      </div>
      </Link>
  );
}

function LoadMoreItems({visible, setVisible, total}) {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (visible < total) setVisible(prev => prev + 52);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  
  return (
    <div ref={ref}>
      <div className='item-list__loading' >
        {visible < total && <>Loading more items...</>}
      </div>
    </div>
  );
}

export default Characters;