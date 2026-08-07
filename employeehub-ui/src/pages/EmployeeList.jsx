import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import "../App.css";
import SalaryChart from "../components/SalaryChart";
import {   TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar} from "@mui/material";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box
} from "@mui/material";


import GroupsIcon from "@mui/icons-material/Groups";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import DashboardStats from "../components/dashboard/DashboardStats";
import RecentEmployees from '../components/dashboard/RecentEmployees';

function EmployeeList() {

  const[employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [salary, SetSalary] = useState("");
  const [editingId, SetEditingId] = useState(null);
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [sort, setSort] = useState("name,asc");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState({
    totalEmployees: 0,
    highestSalary: 0,
    lowestSalary: 0,
    averageSalary: 0
});

  async function fetchEmployees(){
    try
    {
      setLoading(true);

      const keyword = debouncedSearch.trim();

      const response = await api.get(`/employees/filter?name=${keyword}&page=${page}&size=${size}&sort=${sort}`);
      
      setEmployees(response.data.data.content);
      setTotalPages(response.data.data.totalPages);
    }
    catch(error)
    {
      console.log(error);
    }
    finally
    {
      setLoading(false);
    }
  }

  async function fetchDashboard() {
    try {
      const response = await api.get("/employees/dashboard");
      setDashboard(response.data.data);
    } catch(error)
    {
      console.log(error);
    }
  }

  useEffect(() => {
      fetchEmployees();
      fetchDashboard();
    }, [page, sort, debouncedSearch])

useEffect(() => 
{
  const timer = setTimeout(() =>
  {
    setDebouncedSearch(search);
  }, 500);

  return () => clearTimeout(timer);
}, [search])
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
      let response;
      if (editingId)
      {
        response = await api.put(`/employees/${editingId}`, employee);
        alert("Employee Udpated Successfully");
      }
      else
      {
        response = await api.post("/employees", employee);
        alert("Employee Added Successfully");
      }

      console.log(response.data);

      await fetchEmployees();
      await fetchDashboard();
      resetForm();
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

  function resetForm()
  {
    SetName("");
    SetEmail("");
    SetSalary("");

    SetEditingId(null);
  }

  function cancelEdit() {
    resetForm();
}

async function deleteEmployee(id)
{
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this employee?"
  );

  if (!confirmDelete)
  {
    return;
  }

  try{
    await api.delete(`/employees/${id}`);
    alert("Employee deleted successfully.");

    await fetchEmployees();
    await fetchDashboard();
    
    if (search !== "")
    {
      setSearch("");
    }
  }
  catch(error)
  {
    console.log(error);
    alert("Failed to delete employee.");
  }
}

  return(
    <div className="container">
      <h1 className="title">Dashboard</h1>
      {loading && (
        <p className='loading-text'>Loading Employees...</p>
      )}

     <DashboardStats dashboard={dashboard} />

      <SalaryChart
        employees={employees}
        loading={loading}
    />

      <div className='sort-container'>
        <FormControl sx={{minWidth: 220}}>
          <InputLabel>
          Sort By:
          </InputLabel>
        
        <Select
          value={sort}
          label="sort By"
          onChange={(e)=> {
            setSort(e.target.value);
            setPage(0);
          }}>
            <MenuItem value="name,asc">Name (A-Z)</MenuItem>
            <MenuItem value="name,desc">Name (Z-A)</MenuItem>
            <MenuItem value="salary,asc">Salary (Low-High)</MenuItem>
            <MenuItem value="salary,desc">Salary (High-Low)</MenuItem>
            <MenuItem value="email,asc">Email (A-Z)</MenuItem>
            <MenuItem value="email,desc">Email (Z-A)</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Paper
          elevation={3}
          sx={{
              p: 3,
              mb: 3,
              borderRadius: 3
          }}
      >
          <h2 style={{ marginBottom: 20 }}>
              {editingId ? "Update Employee" : "Add Employee"}
          </h2>

          <div
              style={{
                  display: "flex",
                  gap: "15px",
                  alignItems: "center"
              }}
          >
              <TextField
                  label="Employee Name"
                  value={name}
                  onChange={(e) => SetName(e.target.value)}
                  sx={{ flex: 2 }}
              />

              <TextField
                  label="Email"
                  value={email}
                  onChange={(e) => SetEmail(e.target.value)}
                  sx={{ flex: 2 }}
              />

              <TextField
                  label="Salary"
                  type="number"
                  value={salary}
                  onChange={(e) => SetSalary(e.target.value)}
                  sx={{ width: 180 }}
              />

              <Button
                  variant="contained"
                  size="large"
                  onClick={handleSubmit}
              >
                  {editingId ? "Update" : "Add"}
              </Button>

              {editingId && (
                  <Button
                      variant="outlined"
                      color="secondary"
                      size="large"
                      onClick={cancelEdit}
                  >
                      Cancel
                  </Button>
              )}
          </div>
      </Paper>

      <div className='search-container'>
        <TextField
          fullWidth
          label='Search Employee'
          variant='outlined'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          />
      </div>
    <h3 className="title">Employee Table</h3>

  <RecentEmployees employees={employees.slice(0,5)}/>
    <div className='pagination'>
      <button 
      onClick={()=> setPage(page - 1)}
        disabled={page == 0}  >Previous</button>
        <span className='page-info'>
          Page {page + 1} of {totalPages}
        </span>
      <button onClick={()=> setPage(page + 1)}
        disabled={page + 1 >= totalPages}
      >Next</button>
    </div>
  </div>
  );
}

export default EmployeeList;
