import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getMaterial } from './../api.js';
import { Link } from 'react-router';

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
    <div className='content'>
      <div className='details-header'>Basic Info</div>
      <div className='material'>
        <div className='material-stat'>
          <div className='material-stat-label'>Name</div>
          <div className='material-stat-value'>{mat.name}</div>
        </div>
        <div className='material-stat'>
          <div className='material-stat-label'>Rarity</div>
          <div className='material-stat-value'>{mat.rank}</div>
        </div>
      </div>
      <div className='description'>{mat.description}</div>
      <Source data={mat.source}/>
      <RequiredBy data={mat.additions.requiredBy}/>
    </div>
  </>);
}

function Source({data}) {
  if (!data) return;
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