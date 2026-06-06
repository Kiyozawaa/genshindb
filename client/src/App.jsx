import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/Home.jsx';
import Characters from './pages/Characters.jsx';
import CharacterDetails from './pages/CharacterDetails.jsx';
import Weapons from './pages/Weapons.jsx';
import WeaponDetails from './pages/WeaponDetails.jsx';
import Materials from './pages/Materials.jsx';
import MaterialDetails from './pages/MaterialDetails.jsx';
import Artifacts from './pages/Artifacts.jsx';
import ArtifactDetails from './pages/ArtifactDetails.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/characters'
        element={<Characters/>}/>
        <Route path='/characters/:id' element={<CharacterDetails/>}/>
        <Route path='/weapons' element={<Weapons/>}/>
        <Route path='/weapon/:id' element={<WeaponDetails/>}/>
        <Route path='/materials' element={<Materials/>}/>
        <Route path='/material/:id' element={<MaterialDetails/>}/>
        <Route path='/artifacts' element={<Artifacts/>}/>
        <Route path='artifact/:id' element={<ArtifactDetails/>}/>
      </Routes>
      
    </BrowserRouter>
  );
}