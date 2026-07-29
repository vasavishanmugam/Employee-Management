import { useEffect, useState } from 'react'
import api from './services/api';
import "./App.css";

function App() {

  const[employees, setEmployees] = useState([]);

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

  return(
    <div className="container">
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
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>₹ {employee.salary.toLocaleString("en-IN")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}

export default App;
