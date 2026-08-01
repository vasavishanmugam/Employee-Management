import { useEffect, useState } from 'react'
import api from './services/api';
import "./App.css";

function App() {

  const[employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [salary, SetSalary] = useState("");
  const [editingId, SetEditingId] = useState(null);

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

  useEffect(() => {
      fetchEmployees();
    }, [])


  const filteredEmployees = employees.filter((employee) =>
  employee.name.toLowerCase().includes(search.toLowerCase()))

  async function handleSubmit()
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
      salary: Number(salary)
    };

    try{
      const response = await api.post("/employees", employee);
      console.log(response.data);
      alert("Employee Added Successfully");

      SetName("");
      SetEmail("");
      SetSalary("");
      fetchEmployees();
    }
    catch(error)
    {
      console.log(error);
      alert("Failed to add employee");
    }
  }

  function editEmployee(employee)
  {
    SetEditingId(employee.id);
    SetName(employee.name);
    SetEmail(employee.email);
    SetSalary(employee.salary);
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

        <button onClick={handleSubmit}>{ editingId ? "Update Employee" : "Add Employee"} </button>

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
          <th>Action</th>
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
            <td>
              <button 
                className='edit-btn'
                onClick={() => editEmployee(employee)}>
                Edit
              </button>
            </td>
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
