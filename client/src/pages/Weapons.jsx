import { getWeaponList } from './../api.js';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

function Weapons() {
  const [weaponList, setWeaponList] = useState(null);
  async function loadWeaponList() {
    const wepList = await getWeaponList();
    setWeaponList(wepList);
  }
  
  useEffect(() => {
    loadWeaponList();
  }, []);
  
  if (!weaponList) return <div>Loading...</div>;
  return (
  <>
    <div className='item-list'>
      {weaponList.map(w => (
          <Item wep={w}/>
      ))}
    </div>
  </>
  )
}

function Item({wep}) {
  if (wep.id >= 310001) return; //prevents skin from showing up
  const iconUrl = `https://gi.yatta.moe/assets/UI/`;
  return (
    <Link to={`/weapon/${wep.id}`}>
    <div className='item-card'>
      <img
      className='icon'
      src={iconUrl+wep.icon+'.png'}/>
      <div className='item-name'>
      {wep.name}</div>
      </div>
      </Link>
  );
}

export default Weapons;