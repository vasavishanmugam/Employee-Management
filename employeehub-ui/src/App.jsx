import { useEffect, useState } from 'react'
import api from './services/api';
import "./App.css";

function App() {

  const[employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

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

  return(
    <div className="container">
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
