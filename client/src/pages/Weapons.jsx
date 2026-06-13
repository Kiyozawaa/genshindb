import { getWeaponList } from './../api.js';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import BackButton from './../components/BackButton.jsx';
import NavBar from './../components/NavBar.jsx';
import SearchBar from './../components/SearchBar.jsx';
function Weapons() {
  const [weaponList, setWeaponList] = useState(null);
  const [query, setQuery] = useState(null);
  
  async function loadWeaponList() {
    const wepList = await getWeaponList();
    setWeaponList(wepList);
  }
  
  useEffect(() => {
    loadWeaponList();
  }, []);
  
  if (!weaponList) return <div>Loading...</div>;
  
  let result = weaponList;
  if (query) {
    result = result.filter(weapon => weapon.name.toLowerCase().includes(query.trim().toLowerCase()));
  }
  
  const showCount = weaponList.length !== result.length;
  return (<>
    <BackButton to='/' value='Home'/>
    <SearchBar type='Weapon' setQuery={setQuery}/>
     {showCount &&
      <div className='search__text'>
        {result.length
        ? `Showing ${result.length} weapon${result.length > 1 ? 's' : ''}.`
        : 'No weapon found.'}
      </div>
    }
    <div className='item-list'>
      {result.map(w => (
          <Item wep={w}/>
      ))}
    </div>
  <NavBar/>
  </>)
}

function Item({wep}) {
  if (wep.id >= 310001) return; //prevents skin from showing up
  const iconUrl = `https://gi.yatta.moe/assets/UI/`;
  return (
    <Link className='a' to={`/weapon/${wep.id}`}>
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