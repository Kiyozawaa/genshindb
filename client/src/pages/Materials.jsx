import { useEffect, useState } from 'react';
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
  
  async function loadMats() {
    const data = await getAllMaterials();
    setMatList(data);
  }
  
  useEffect(() => {
    loadMats();
  }, []);
  
  if (!matList) return <div>Loading...</div>
  
  let result = matList ?? [];
  
  if (query.trim()) {
    result = result.filter(material => material.name.toLowerCase().includes(query.trim().toLowerCase()));
  }
  if (filters.rarities.length) {
    result = result.filter(material => filters.rarities.includes(material.rank));
  }
  if (filters.matType.length) {
    result = result.filter(material => filters.matType.includes(material.type));
  }
  
  return (<>
    <BackButton to='/' value='Home'/>
    <SearchBar type='Material' setQuery={setQuery} filters={filters} setFilters={setFilters}/>
    <div className='item-list'>
      {result.map(material => (
        <Item key={material.id} material={material}/>
      ))}
    </div>
  </>);
}

function Item({material}) {
  const assetURL = `https://gi.yatta.moe/assets/UI/`;
  return (
    <Link className='item-card__link' to={`/material/${material.id}`}>
      <div className='item-card'>
        <img className='item-card__icon' src={assetURL+material.icon+'.png'}/>
        <div className='item-card__name'>{material.name}</div>
      </div>
    </Link>
  );
}