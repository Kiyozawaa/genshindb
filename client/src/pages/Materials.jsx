import { useEffect, useRef, useState } from 'react';
import { getAllMaterials } from './../api.js';
import { Link, useParams } from 'react-router';
import BackButton from './../components/BackButton.jsx';
import SearchBar from './../components/SearchBar.jsx';

export default function Materials() {
  const [matList, setMatList] = useState(null);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    rarities: [],
    matType: []
  });
  const [visibleItems, setVisibleItems] = useState(52);
  
  async function loadMats() {
    const data = await getAllMaterials();
    setMatList(data);
  }
  
  useEffect(() => {
    loadMats();
  }, []);
  
  if (!matList) return <div>Loading...</div>
  
  let result = matList?.sort((a, b) => b.rank - a.rank);
  
  if (query.trim()) {
    result = result.filter(material => material.name.toLowerCase().includes(query.trim().toLowerCase()));
  }
  if (filters.rarities.length) {
    result = result.filter(material => filters.rarities.includes(material.rank));
  }
  if (filters.matType.length) {
    result = result.filter(material => filters.matType.includes(material.type));
  }
  
  const totalItems = result?.length;
  let visibleResults = result.slice(0, visibleItems);
  
  return (<>
    <BackButton to='/' value='Home'/>
    <SearchBar type='Material' setQuery={setQuery} filters={filters} setFilters={setFilters}/>
    <div className='item-list'>
      {visibleResults.map(material => (
        <Item key={material.id} material={material}/>
      ))}
    </div>
    <LoadMoreItems visibleItems={visibleItems} setVisibleItems={setVisibleItems} totalItems={totalItems}/>
  </>);
}

function Item({material}) {
  const assetURL = `https://gi.yatta.moe/assets/UI/`;
  return (
    <Link className='item-card__link' to={`/material/${material.id}`}>
      <div className='item-card'>
        <img className={`item-card__icon rarity-${material.rank}`} src={assetURL+material.icon+'.png'}/>
        <div className='item-card__name'>{material.name}</div>
      </div>
    </Link>
  );
}

function LoadMoreItems({visibleItems, setVisibleItems, totalItems}) {
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (visibleItems < totalItems) setVisibleItems(prev => prev + 52);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  
  return (
    <div ref={ref}>
      {visibleItems < totalItems &&
        <div className='item-list__loading'>Loading more items...</div>
      }
    </div>
  );
}
