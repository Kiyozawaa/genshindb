import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getMaterial } from './../api.js';
import { Link } from 'react-router';
import BackButton from './../components/BackButton.jsx';
import { parseDescription } from './../utils/parseText.js';

export default function MaterialDetails() {
  const [mat, setMat] = useState(null);
  const { id } = useParams();
  async function loadMat() {
    const data = await getMaterial(id);
    setMat(data);
  }
  useEffect(() => {
    loadMat();
  }, []);
  
  if (!mat) return <div>Loading...</div>
  
  return (<>
      <BackButton to='/materials' value='Materials'/>
      <MaterialProfile material={mat}/>
      <div className='item__description' dangerouslySetInnerHTML={{ __html: parseDescription(mat.description)}}/>
      <Source data={mat.source}/>
      <RequiredBy data={mat.additions.requiredBy}/>
  </>);
}

function MaterialProfile({material}) {
  const assetURL = 'https://gi.yatta.moe/assets/UI/';
  
  return (<>
    <div className='item-profile'>
      <img className='item-profile__avatar-weapon' src={assetURL+material.icon+'.png'}/>
      <div className='item-profile__name'>{material.name}</div>
      <div className='item-profile__type'>{material.type}</div>
      <div className='item-profile__rarity'>{'*'.repeat(material.rank)}</div>
    </div>
  </>)
}

function Source({data}) {
  if (!data) return;
  data = data.filter(d => !d.name.startsWith('Placeholder')); //Removes in-game 'Craftable Amount' option
  return (<>
    <div className='details-header'>Source</div>
      {data.map(s => (
    <div className='material-stat source'>
      <div key={s.name} className='material-stat-label source'>
        {s.name} {s.days && <>({s.days.join(', ')})</>}
      </div>
    </div>
      ))}
  </>)
}

function RequiredBy({data}) {
  if (!data) return;
  const chars = data.avatar;
  return (<>
    <div className='details-header'>Required By</div>
    <div className='item-list-home'>
      {chars.map(char => (
      <Item key={char.id} data={char}/>
      ))}
    </div>
  </>)
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