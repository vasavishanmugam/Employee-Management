import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import "../App.css";
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

      <Grid container spacing={3} sx={{ mb:4}}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={3}>
            <CardContent>
               <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                  <div>
                    <Typography variant='subtitle2' color='text.secondary'>
                      Total Employees
                    </Typography>

                    <Typography variant='h4'  sx={{
                        color: "#1976d2",
                        fontWeight: "bold"
                    }}>
                      {dashboard.totalEmployees}
                    </Typography>
                  </div>

                  <GroupsIcon
                  sx={{
                    fontSize: 45,
                    color: "#1976d2"
                  }} />
                </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <div>
                  <Typography variant='subtitle2' color='text.secondary'>
                    Highest Salary
                  </Typography>

                  <Typography variant='h4'sx={{ 
                                            color: "#2e7d32",
                                            fontWeight: "bold"}}>
                    ₹{dashboard.highestSalary?.toLocaleString("en-IN")}
                  </Typography>
                </div>
              </Box>
              <TrendingUpIcon
              sx={{
                fontSize:45,
                color: "#2e7d32"
              }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <div>
                  <Typography variant='subtitle2' color='text.secondary'>
                    Lowest Salary
                  </Typography>

                  <Typography variant='h4' sx={{
                      color: "#d32f2f",
                      fontWeight: "bold"
                  }}>
                    ₹{dashboard.lowestSalary?.toLocaleString("en-IN")}
                  </Typography>
                </div>

                <TrendingDownIcon
                sx={{
                  fontSize: 45,
                  color: "#d32f2f"
                }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <div>
                  <Typography variant='subtitle2' color='text.secondary'>
                    Average Salary
                  </Typography>

                  <Typography variant='h4' sx={{
                        color: "#7b1fa2",
                        fontWeight: "bold"
                    }}>
                    ₹{Math.round(dashboard.averageSalary)?.toLocaleString("en-IN")}
                  </Typography>
                </div>
                <AccountBalanceWalletIcon
                  sx={{
                    fontSize: 45,
                    color: "#7b1fa2"
                  }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <div className='search-container'>
        <TextField
          fullWidth
          label='Search Employee'
          variant='outlined'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          />
      </div>
    <h1 className="title">Employee Management System</h1>
    {loading && (
      <p className='loading-text'>Loading Employees...</p>
    )}

   <TableContainer component={Paper} sx={{ mt: 3 }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Photo</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell align="right">Salary</TableCell>
          <TableCell align="center">Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
        employees.length>0 ?
        employees.map(employee=>(
        <TableRow key={employee.id} hover>
          <TableCell>
            {employee.id}
          </TableCell>
          <TableCell>
            {
            employee.profileImage ?
            <Avatar
              src={`http://localhost:8080/uploads/profile/${employee.profileImage}`}
              alt={employee.name}
            />
            :
            <Avatar>
              {employee.name.charAt(0)}
            </Avatar>
            }
          </TableCell>
          <TableCell>
            {employee.name}
          </TableCell>
          <TableCell>
            {employee.email}
          </TableCell>
          <TableCell align="right">
            ₹ {employee.salary.toLocaleString("en-IN")}
          </TableCell>
          <TableCell align="center">
            <Button
              size="small"
              variant="outlined"
              onClick={()=>navigate(`/employees/${employee.id}`)}
            >
              View
            </Button>
            <Button
              size="small"
              color="warning"
              variant="contained"
              sx={{mx:1}}
              onClick={()=>editEmployee(employee)}
            >
              Edit
            </Button>
            <Button
              size="small"
              color="error"
              variant="contained"
              onClick={()=>deleteEmployee(employee.id)}
            >
              Delete
            </Button>
          </TableCell>
        </TableRow>
        ))
        :
        (
        <TableRow>
          <TableCell
          colSpan={6}
          align="center"
          >
          No Employees Found
          </TableCell>
        </TableRow>
        )
        }
      </TableBody>
    </Table>
  </TableContainer>
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
