import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getWeapon } from './../api.js';
import { STAT_MAPPING } from './../utils/mapping.js';
import { parseDescription } from './../utils/parseText.js';
function WeaponDetails() {
  const { id } = useParams();
  const [weapon, setWeapon] = useState(null);
  async function loadWeaponData() {
    const wepData = await getWeapon(id);
    setWeapon(wepData);
  }
  
  useEffect(() => {
    loadWeaponData();
  }, []);
  
  if (!weapon) return <div>Loading...</div>;
  
  return (
  <>
    <BasicInfo data={weapon}/>
    <Passives data={weapon.passives}/>
  </>
  );
}

function BasicInfo({data}) {
  return (
  <>
    <h2 className='details-header'>Basic Info</h2>
    <div className='weapon'>
      <div className='weapon-stat'>
        <div className='weapon-stat-label'>Name</div>
        <div className='weapon-stat-value'>{data.name}</div>
      </div>
      <div className='weapon-stat'>
        <div className='weapon-stat-label'>Rarity</div>
        <div className='weapon-stat-value'>{data.rank}</div>
      </div>
      <div className='weapon-stat'>
        <div className='weapon-stat-label'>Type</div>
        <div className='weapon-stat-value'>{data.type}</div>
      </div>
      <div className='weapon-stat'>
        <div className='weapon-stat-label'>Base Stat</div>
        <div className='weapon-stat-value'></div>
      </div>
      
      {(data.specialProp !== 'None') &&
      <div className='weapon-stat'>
        <div className='weapon-stat-label'>{STAT_MAPPING[data.specialProp]}</div>
        <div className='weapon-stat-value'></div>
      </div>
      }

      <div className='description'>{data.description}</div>
    </div>
  </>
  );
}

function Passives({data}) {
  if (data.length < 1) return;
  const [refinement, setRefinement] = useState(1);
  return (
    <>
      <div className='passive'>
        <div className='flex-box'>
          <h3>Refinement {refinement}</h3>
          {[1, 2, 3, 4, 5].map(n => (
          <div key={n}
          className={`box ${refinement === n ? 'active' : ''}`}
          onClick={() => setRefinement(n)}>{n}</div>
          ))}
        </div>
        <p dangerouslySetInnerHTML={{ __html: parseDescription(data[refinement - 1].description)}}/>
      </div>
    </>
  )
}

export default WeaponDetails;