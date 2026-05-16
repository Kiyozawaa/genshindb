import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import NavBar from './../components/NavBar.jsx';
import { getCharacterList } from './../api.js';

function Characters() {
  const [charList, setCharList] = useState();
  async function loadCharacterList() {
    const data = await getCharacterList();
    setCharList(data);
  }

  useEffect(() => {
    loadCharacterList();
  }, []);
  if (!charList) return 'Loading...';
  return (
  <div className='content'>
  <div className='item-list'>
    {charList.map(char => (
      <Item key={char.id} char={char}/>
    ))}
  </div>
  <NavBar/>
  </div>
  );
}


function Item({char}) {
  const iconUrl = `https://gi.yatta.moe/assets/UI/`;
  return (
    <Link className='a' to={`/characters/${char.id}`}>
    <div className='item-card'>
      <img
      className='icon'
      src={iconUrl+char.icon+'.png'}/>
      <div className='item-name'>
      {char.name}</div>
        
      </div>
      </Link>
  );
}

export default Characters;