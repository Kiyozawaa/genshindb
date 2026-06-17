import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getAllArtifacts } from './../api.js';
import NavBar from './../components/NavBar.jsx';

export default function Artifacts() {
  const [artifacts, setArtifacts] = useState(null);
  
  async function loadArtis() {
    const artis = await getAllArtifacts();
    setArtifacts(artis);
  }
  
  useEffect(() => {
    loadArtis();
  }, []);
  
  if (!artifacts) return 'Loading...';
  
  let result = artifacts?.sort((a, b) => b.levelList[1] - a.levelList[1]);

  return (
    <div className='item-list'>
      {result.map(artifact => (
        <Item key={artifact.id} data={artifact}/>
      ))}
    </div>
  );
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