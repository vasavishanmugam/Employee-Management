import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Welcome from './components/Welcome'

function App() {
  function showMessage()
  {
    alert("Welcome to Employee Management System");
  }
  return (
    <div>
    <h1>Employee Management System</h1>
    <Welcome name="Vasavi"/>
    <Welcome name="Rahul"/>
    <Welcome name="Priya"/>

    <button onClick={showMessage}>
      Click Me
    </button>
    </div>
  );
}

export default App;
