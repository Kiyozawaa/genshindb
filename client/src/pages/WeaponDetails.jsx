import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getWeapon } from './../api.js';
import { STAT_MAPPING } from './../utils/mapping.js';

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
  </>
  );
}

function BasicInfo({data}) {
  return (
  <>
    <h2 className='details-header'>Profile</h2>
    <div className='character-info'>
      <div className='stat'>
        <div className='stat-label'>Name</div>
        <div className='stat-value'>{data.name}</div>
      </div>
      <div className='stat'>
        <div className='stat-label'>Rarity</div>
        <div className='stat-value'>{data.rank}</div>
      </div>
      <div className='stat'>
        <div className='stat-label'>Type</div>
        <div className='stat-value'>{data.type}</div>
      </div>
      <div className='stat'>
        <div className='stat-label'>Substat</div>
        <div className='stat-value'>{STAT_MAPPING[data.specialProp]}</div>
      </div>
      <div className='description'>{data.description}</div>
    </div>
  </>
  );
}
export default WeaponDetails;