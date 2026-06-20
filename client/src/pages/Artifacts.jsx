import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getAllArtifacts } from './../api.js';
import BackButton from './../components/BackButton.jsx';
import SearchBar from './../components/SearchBar.jsx';

export default function Artifacts() {
  const [artifacts, setArtifacts] = useState(null);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    rarities: []
  });
  
  async function loadArtis() {
    const artis = await getAllArtifacts();
    setArtifacts(artis);
  }
  
  useEffect(() => {
    loadArtis();
  }, []);
  
  if (!artifacts) return 'Loading...';
  
  let result = artifacts?.sort((a, b) => b.levelList[1] - a.levelList[1]);
  
  if (query.trim()) {
    result = result.filter(artifact => artifact.name.trim().toLowerCase().includes(query.trim().toLowerCase()));
  }
  if (filters.rarities.length) {
    result = result.filter(artifact => filters.rarities.includes(artifact.levelList[1]));
  }
  
  const showCount = artifacts.length !== result.length;
  
  return (<>
    <BackButton to='/' value='Home'/>
    <SearchBar setQuery={setQuery} filters={filters} setFilters={setFilters} type='Artifact'/>
    {showCount &&
      <div className='search__text'>
        {result.length ? `Showing ${result.length} artifact${result.length > 1 ? 's' : ''}.` : 'No character found.'}
      </div>
    }
    <div className='item-list'>
      {result.map(artifact => (
        <Item key={artifact.id} data={artifact}/>
      ))}
    </div>
  </>);
}

function Item({data}) {
  const iconUrl = `https://gi.yatta.moe/assets/UI/reliquary/`;
  return (
    <Link className='item-card__link' to={`/artifact/${data.id}`}>
      <div className='item-card'>
        <img className={`item-card__icon rarity-${data.levelList[1]}`} src={iconUrl+data.icon+'.png'}/>
        <div className='item-card__name'>
          {data.name}
        </div>
      </div>
    </Link>
  );
}