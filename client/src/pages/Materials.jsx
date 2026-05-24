import { useEffect, useState } from 'react';
import { getAllMaterials } from './../api.js';
import { Link, useParams } from 'react-router';
import NavBar from './../components/NavBar.jsx';

export default function Materials() {
  const [matList, setMatList] = useState(null);
  
  async function loadMats() {
    const data = await getAllMaterials();
    setMatList(data);
  }
  
  useEffect(() => {
    loadMats();
  }, []);
  
  if (!matList) return <div>Loading...</div>
  
  return (<>
    <div className='content'>
      <div className='item-list'>
        {matList.map(m => (
        <Item mat={m}/>
        ))}
      </div>
    </div>
    <NavBar/>
  </>)
}

function Item({mat}) {
  const iconUrl = `https://gi.yatta.moe/assets/UI/`;
  return (
    <Link className='a' to={`/material/${mat.id}`}>
    <div className='item-card'>
      <img
      className='icon'
      src={iconUrl+mat.icon+'.png'}/>
      <div className='item-name'>
      {mat.name}</div>
      </div>
      </Link>
  );
}