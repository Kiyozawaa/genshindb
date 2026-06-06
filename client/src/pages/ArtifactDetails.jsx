import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getArtifact } from './../api.js';
import NavBar from './../components/NavBar.jsx';

const iconUrl = `https://gi.yatta.moe/assets/UI/reliquary/`;
export default function Details() {
  const { id } = useParams();
  const [artifact, setArtifact] = useState(null);
  
  async function loadArtifact() {
    const arti = await getArtifact(id);
    setArtifact(arti);
  }
  
  useEffect(() => {
    loadArtifact();
  }, []);
  
  if (!artifact) return 'Loading...';
  
  return (<>
    <div className='content'>
      <div className='artifact-page-title'>
        {artifact.name}
      </div>
      <div className='artifact-page-icon'>
        <img src={iconUrl+artifact.icon+'.png'}/>
      </div>
      <div className='artifact-page-details'>
        <h3>Set Bonus</h3>
        {Object.entries(artifact.affixList).map(([aid, effect], i) => (
        <p key={aid}>
          <strong>{i === 0 && '2-piece: '}
          {i === 1 && '4-piece: '}</strong>
          {effect}
        </p>
        ))}
      </div>
        <Pieces data={artifact.suit}/>
    </div>
    <NavBar/>
  </>)
}

function Pieces({data}) {
  if (!data) return;
  const [active, setActive] = useState(0);
  return (<>
      <div className='artifact-page-pieces'>
        {[0, 2, 4, 3, 1].map((id) => (
        <div key={id}>
          <img className={`artifact-page-pieces__icon ${active === id ? 'active' : ''}`} src={iconUrl+data[id].icon+'.png'} onClick={(e) => setActive(id)}/>
        </div>
        ))}
        </div>
        <PieceDescription active={data[active]}/>
  </>)
}

function PieceDescription({active}) {
  if (!active) return;
  return (<>
    <div className='artifact-page-details'>
      <h3>{active.name}</h3>
      <p>{active.description}</p>
    </div>
  </>)
}