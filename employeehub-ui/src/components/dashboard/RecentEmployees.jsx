import {
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
     Avatar
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function RecentEmployees({ employees = [],
    title = "Recent Employees",
    showButton = true
 }) {
    const navigate = useNavigate();
    return (
        <Card elevation={3}>
            <CardContent>
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ mb: 2}}>
                       {title}
                    </Typography>
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
               {showButton && (
                <Button
                    variant="contained"
                    sx={{ mt: 2}}
                    onClick={() => navigate("/employees")}
                >
                    View All Employees
                </Button>
               )}
            </CardContent>
        </Card>
    )
}

export default RecentEmployees;