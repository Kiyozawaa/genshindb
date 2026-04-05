import { getCharacterList } from './api.js';
import { useEffect, useState } from 'react';
import Characters from './components/Characters.jsx';

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
    <Characters charList={charList}/>
  );
}