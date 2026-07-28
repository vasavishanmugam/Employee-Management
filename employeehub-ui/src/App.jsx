import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Welcome from './components/Welcome'

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");

  function handleSubmit(event)
  {
    event.preventDefault();
    console.log("Employee Details");
    
    console.log("Name :", name);
    console.log("Email :", email);
    console.log("Salary :", salary);
  }
  return (
    <div>
     <h1>Employee Form</h1>
     <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter Employee Name" value={name}
        onChange={(event) => setName(event.target.value)}/>
        <br /><br />
        <input type="email" placeholder="Enter Email" value={email}
        onChange={(event) => setEmail(event.target.value)}/>
        <br /><br />
        <input type="number" placeholder="Enter Salary" value={salary}
        onChange={(event) => setSalary(event.target.value)}/>
        <hr />

        <br /><br />
        <button type='submit'>Save Employee</button>
      </form>
    </div>
  );
}

export default App;
