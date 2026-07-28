import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Welcome from './components/Welcome'

function App() {
  const [count, setCount] = useState(0);
  function increase()
  {
    setCount(count + 1);
  }
  function decrease()
  {
    setCount(count - 1);
  }
  function reset()
  {
    setCount(0);
  }
  return (
    <div>
    <h1>Employee Counter</h1>
    <h2>{count}</h2>
    <button onClick={increase}>
      Increase
    </button>
       <button onClick={decrease}>
      Decrease
    </button>
      <button onClick={reset}>
      Reset
    </button>
    </div>
  );
}

export default App;
