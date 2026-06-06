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
  return (<>
    <div className='content'>
      <div className='item-list'>
        {artifacts.map(artifact => (
        <Item key={artifact.id} data={artifact}/>
        ))}
      </div>
    </div>
    <NavBar/>
  </>)
}

function Item({data}) {
  const iconUrl = `https://gi.yatta.moe/assets/UI/reliquary/`;
  return (
    <Link className='a' to={`/artifact/${data.id}`}>
    <div className='item-card'>
      <img
      className='icon'
      src={iconUrl+data.icon+'.png'}/>
      <div className='item-name'>
      {data.name}</div>
      </div>
      </Link>
  );
}