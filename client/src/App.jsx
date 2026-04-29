import { getCharacterList } from './api.js';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Characters from './pages/Characters.jsx';
import CharacterDetails from './pages/CharacterDetails.jsx';
import Weapons from './pages/Weapons.jsx';
import WeaponDetails from './pages/WeaponDetails.jsx';

export default function App() {
  const [charList, setCharList] = useState([]);
  async function loadCharacterList() {
    const data = await getCharacterList();
    setCharList(data);
  }
  
  useEffect(() => {
    loadCharacterList();
  }, []);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/characters'
        element={<Characters charList={charList}/>}/>
        <Route path='/characters/:id' element={<CharacterDetails/>}/>
        <Route path='/weapons' element={<Weapons/>}/>
        <Route path='/weapon/:id' element={<WeaponDetails/>}/>
      </Routes>
      
    </BrowserRouter>
  );
}