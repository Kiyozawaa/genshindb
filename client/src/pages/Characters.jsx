import { Link } from 'react-router';

function Characters({charList}) {
  return (
  <div className='item-list'>
    {charList.map(char => (
      <Item key={char.id} char={char}/>
    ))}
  </div>
  );
}


function Item({char}) {
  const iconUrl = `https://gi.yatta.moe/assets/UI/`;
  return (
    <Link to={`/characters/${char.id}`}>
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