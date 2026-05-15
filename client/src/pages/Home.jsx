import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getBdays } from './../api.js';
import NavBar from './../components/NavBar.jsx';

export default function Homepage() {
  return (
  <div className='content'>
    <h2 className='details-header'>Upcoming Birthdays</h2>
    <Birthdays/>
    <NavBar/>
  </div>
  )
}

function Birthdays() {
  const [bdays, setBdays] = useState(null);
  async function loadBdays() {
    const data = await getBdays();
    setBdays(data);
  }
  useEffect(() => {
    loadBdays();
    }, []);
  if (!bdays) return 'Loading...';
  return (
  <div className='item-list-home'>
    {bdays.map(c => (
    <Item key={c.id} char={c}/>
    ))}
  </div>
  )
}

function Item({char}) {
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