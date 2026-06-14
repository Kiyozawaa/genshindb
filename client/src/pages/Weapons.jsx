import { getWeaponList } from './../api.js';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import BackButton from './../components/BackButton.jsx';
import NavBar from './../components/NavBar.jsx';
import SearchBar from './../components/SearchBar.jsx';

function Weapons() {
  const [weaponList, setWeaponList] = useState(null);
  const [query, setQuery] = useState(null);
  const [filters, setFilters] = useState({
    rarities: [],
    weaponTypes: [],
    props: []
  });
  
  async function loadWeaponList() {
    const wepList = await getWeaponList();
    setWeaponList(wepList);
  }
  
  useEffect(() => {
    loadWeaponList();
  }, []);
  
  if (!weaponList) return <div>Loading...</div>;
  
  let result = weaponList.sort((a, b) => b.rank - a.rank);
  
  if (query) {
    result = result.filter(weapon => weapon.name.toLowerCase().includes(query.trim().toLowerCase()));
  }
  
  if (filters.rarities.length) {
    result = result.filter(weapon => filters.rarities.includes(weapon.rank));
  }
  if (filters.weaponTypes.length) {
    result = result.filter(weapon => filters.weaponTypes.includes(weapon.type));
  }
  if (filters.props.length) {
    result = result.filter(weapon => filters.props.includes(weapon.specialProp));
  }
  
  const showCount = weaponList.length !== result.length;
  return (<>
    <BackButton to='/' value='Home'/>
    <SearchBar type='Weapon' setQuery={setQuery} filters={filters} setFilters={setFilters}/>
     {showCount &&
      <div className='search__text'>
        {result.length
        ? `Showing ${result.length} weapon${result.length > 1 ? 's' : ''}.`
        : 'No weapon found.'}
      </div>
    }
    <div className='item-list'>
      {result.map(weapon => (
          <Item key={weapon.id} wep={weapon}/>
      ))}
    </div>
  <NavBar/>
  </>)
}

function Item({wep}) {
  if (wep.id >= 310001) return; //prevents skin from showing up
  const assetURL = `https://gi.yatta.moe/assets/UI/`;
  return (
    <div className='item-card'>
      <Link className='item-card__link' to={`/weapon/${wep.id}`}>
        <img className={`item-card__icon rarity-${wep.rank}`} src={assetURL+wep.icon+'.png'}/>
        <div className='item-card__name'>
          {wep.name}
        </div>
      </Link>
    </div>
  );
}

export default Weapons;