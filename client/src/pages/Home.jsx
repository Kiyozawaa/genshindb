import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getHome } from './../api.js';
import NavBar from './../components/NavBar.jsx';

export default function Homepage() {
  const [bdays, setBdays] = useState(null);
  const [newChars, setNewChars] = useState(null);
  async function loadBdays() {
    const data = await getHome();
    setNewChars(data.newChars);
    setBdays(data.bdays);
  }
  useEffect(() => {
    loadBdays();
    }, []);
  return (
  <div className='content'>
    <h2 className='details-header'>New Characters</h2>
    <NewCharacters data={newChars}/>
    <h2 className='details-header'>Upcoming Birthdays</h2>
    <Birthdays data={bdays}/>
    <NavBar/>
  </div>
  )
}

function NewCharacters({data}) {
  if (!data) return 'Loading...';
  return (
  <div className='item-list-home'>
    {data.map(c => (
    <Item key={c.id} data={c}/>
    ))}
  </div>
  )
}


function Birthdays({data}) {
  if (!data) return 'Loading...';
  return (
  <div className='item-list-home'>
    {data.map(c => (
    <ItemBday key={c.id} char={c}/>
    ))}
  </div>
  )
}

function Item({data}) {
  const iconUrl = `https://gi.yatta.moe/assets/UI/`;
  return (
    <Link className='a-home' to={`/characters/${data.id}`}>
    <div className='item-card-home'>
      <img
      className='icon-home'
      src={iconUrl+data.icon+'.png'}/>
      <div className='item-name-home'>
      {data.name}</div>
      </div>
      </Link>
  );
}

function ItemBday({char}) {
  const iconUrl = `https://gi.yatta.moe/assets/UI/`;
  return (
    <Link className='a-home' to={`/characters/${char.id}`}>
    <div className='item-card-home'>
      <img
      className='icon-home'
      src={iconUrl+char.icon+'.png'}/>
      <div className='item-name-home'>
      {char.birth}</div>
      </div>
      </Link>
  );
}