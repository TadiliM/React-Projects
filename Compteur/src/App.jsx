import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState( () => {
    const saved = localStorage.getItem("count");
    if (saved) return Number(saved);
    return 0;
  });
  const [pas, setPas] = useState(1);
  const [compte, setCompte] = useState(false);

  useEffect( () => {
    if (!compte) return;
    const id = setInterval(() => setCount((count) => count+pas), 1000);
    return () => clearInterval(id);

  },[pas,compte]);

  useEffect( () => {
    localStorage.setItem("count", count);

  }, [count]);

  return (
    <>
      <h1>Compteur Personalisé</h1>
      <h4>Le pas est {pas}</h4>
      <p style={{ color: count > 10 ? 'red' : 'green'}}>{count}</p>
      <button onClick={() => setCount((count) => count+pas)} >+{pas}</button>
      <button onClick={() => setCount((count) => Math.max(0,count-pas))} >-{pas}</button>
      <button onClick={() => setCount(0)} >Reset</button>
      <br></br>
      <input type='range' min="0" value={pas} onChange={(e) => setPas(Number(e.target.value))}></input>
      <button onClick={() => setCompte(!compte)}>Compteur automatique : { compte ? "ON" : "OFF" }</button>
    </> 
  )
}

export default App
