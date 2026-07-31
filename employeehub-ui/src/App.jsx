import { useEffect, useState } from 'react'
import api from './services/api';
import "./App.css";

function App() {

  const[employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [salary, SetSalary] = useState("");

  useEffect(() =>{
    async function fetchEmployees(){
      try
      {
        const response = await api.get("/employees");
        setEmployees(response.data.data.content);
      }
      catch(error)
      {
        console.log(error);
      }
    }

    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter((employee) =>
  employee.name.toLowerCase().includes(search.toLocaleLowerCase()))

  function handleSubmit()
  {
    if(!name.trim())
    {
      alert("Name is required.");
      return;
    }

    if (!email.trim())
    {
      alert("Email is required.");
      return;
    }

    if(!salary)
    {
      alert("Salary is required.");
      return;
    }

    const employee = {
      name,
     email,
      salary
    };

    console.log(employee);
  }

  return(
    <div className="container">
      <div className='form-container'>
        <input
        type='text'
        placeholder='Enter Name'
        value={name}
        onChange={(e) => SetName(e.target.value)}
        />
        <input
        type='email'
        placeholder='Enter Email'
        value={email}
        onChange={(e) => SetEmail(e.target.value)}
        />
        <input
        type='number'
        placeholder='Enter Salary'
        value={salary}
        onChange={(e) => SetSalary(e.target.value)}
        />

        <button onClick={handleSubmit}>Add Employee</button>

      </div>

      <div className='search-container'>
        <input
          type='text'
          placeholder='Search employee by name...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='search-input'
          />
      </div>
    <h1 className="title">Employee Management System</h1>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Salary</th>
        </tr>
      </thead>

      <tbody>
        {filteredEmployees.length > 0 ? (
        filteredEmployees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>₹ {employee.salary.toLocaleString("en-IN")}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="4" className='no-data'>No Employees found.</td>
        </tr>
      )}
      </tbody>
    </table>
  </div>
  );
}

export default App;
