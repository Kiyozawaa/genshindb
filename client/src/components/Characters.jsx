function Characters({charList}) {
  return (
  <div className='character-list'>
    {charList.map(char => (
      <Item key={char.id} char={char}/>
    ))}
  </div>
  );
}


function Item({char}) {
  const iconUrl = `https://gi.yatta.moe/assets/UI/`;
  return (
    <a className='character-card'
    href={'/characters/'+char.id}>
      <img
      className='icon'
      src={iconUrl+char.icon+'.png'}/>
      <div className='char-name'>
      {char.name}</div>
        
      </a>
  );
}

export default Characters;