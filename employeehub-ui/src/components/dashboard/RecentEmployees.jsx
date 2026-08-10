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
    Avatar,
    Box,
    Skeleton
} from "@mui/material";

import { useNavigate } from "react-router-dom";


function RecentEmployees({
    employees = [],
    title = "Recent Employees",
    showButton = true,
    onDelete,
    loading = false
}) {

    const navigate = useNavigate();


    return (
        <Card
            elevation={3}
            sx={{
                borderRadius: 3
            }}
        >

            <CardContent>

                {/* TITLE */}

                <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ mb: 2 }}
                >
                    {title}
                </Typography>


                {/* ========================= */}
                {/* LOADING SKELETON */}
                {/* ========================= */}

                {loading ? (

                    <TableContainer
                        component={Paper}
                        elevation={0}
                        sx={{
                            border: "1px solid #e0e0e0",
                            borderRadius: 2
                        }}
                    >

                        <Table>

                            {/* HEADER */}

                            <TableHead>

                                <TableRow>

                                    <TableCell>
                                        <strong>ID</strong>
                                    </TableCell>

                                    <TableCell>
                                        <strong>Photo</strong>
                                    </TableCell>

                                    <TableCell>
                                        <strong>Name</strong>
                                    </TableCell>

                                    <TableCell>
                                        <strong>Email</strong>
                                    </TableCell>

                                    <TableCell>
                                        <strong>Salary</strong>
                                    </TableCell>

                                    <TableCell>
                                        <strong>Action</strong>
                                    </TableCell>

                                </TableRow>

                            </TableHead>


                            {/* SKELETON ROWS */}

                            <TableBody>

                                {[1, 2, 3, 4, 5].map((item) => (

                                    <TableRow key={item}>

                                        {/* ID */}

                                        <TableCell>
                                            <Skeleton width={30} />
                                        </TableCell>


                                        {/* PHOTO */}

                                        <TableCell>

                                            <Skeleton
                                                variant="circular"
                                                width={40}
                                                height={40}
                                            />

                                        </TableCell>


                                        {/* NAME */}

                                        <TableCell>

                                            <Skeleton width={100} />

                                        </TableCell>


                                        {/* EMAIL */}

                                        <TableCell>

                                            <Skeleton width={180} />

                                        </TableCell>


                                        {/* SALARY */}

                                        <TableCell>

                                            <Skeleton width={80} />

                                        </TableCell>


                                        {/* ACTION */}

                                        <TableCell>

                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    gap: 1
                                                }}
                                            >

                                                <Skeleton
                                                    variant="rounded"
                                                    width={55}
                                                    height={30}
                                                />

                                                <Skeleton
                                                    variant="rounded"
                                                    width={55}
                                                    height={30}
                                                />

                                                <Skeleton
                                                    variant="rounded"
                                                    width={65}
                                                    height={30}
                                                />

                                            </Box>

                                        </TableCell>

                                    </TableRow>

                                ))}

                            </TableBody>

                        </Table>

                    </TableContainer>


                ) : (


                    /* ========================= */
                    /* NORMAL CONTENT */
                    /* ========================= */

                    employees.length > 0 ? (

                        <TableContainer
                            component={Paper}
                            elevation={0}
                            sx={{
                                border: "1px solid #e0e0e0",
                                borderRadius: 2
                            }}
                        >

                            <Table>

                                {/* TABLE HEADER */}

                                <TableHead>

                                    <TableRow>

                                        <TableCell>
                                            <strong>ID</strong>
                                        </TableCell>

                                        <TableCell>
                                            <strong>Photo</strong>
                                        </TableCell>

                                        <TableCell>
                                            <strong>Name</strong>
                                        </TableCell>

                                        <TableCell>
                                            <strong>Email</strong>
                                        </TableCell>

                                        <TableCell>
                                            <strong>Salary</strong>
                                        </TableCell>

                                        <TableCell>
                                            <strong>Action</strong>
                                        </TableCell>

                                    </TableRow>

                                </TableHead>


                                {/* TABLE BODY */}

                                <TableBody>

                                    {employees.map((employee) => (

                                        <TableRow
                                            key={employee.id}
                                            hover
                                        >

                                            {/* ID */}

                                            <TableCell>
                                                {employee.id}
                                            </TableCell>


                                            {/* PHOTO */}

                                            <TableCell>

                                                <Avatar
                                                    src={
                                                        employee.profileImage
                                                            ? `http://localhost:8080/uploads/profile/${employee.profileImage}`
                                                            : undefined
                                                    }
                                                    alt={employee.name}
                                                >

                                                    {!employee.profileImage &&
                                                        employee.name
                                                            ?.charAt(0)
                                                            .toUpperCase()
                                                    }

                                                </Avatar>

                                            </TableCell>


                                            {/* NAME */}

                                            <TableCell>
                                                {employee.name}
                                            </TableCell>


                                            {/* EMAIL */}

                                            <TableCell>
                                                {employee.email}
                                            </TableCell>


                                            {/* SALARY */}

                                            <TableCell>

                                                ₹{" "}

                                                {employee.salary?.toLocaleString(
                                                    "en-IN"
                                                )}

                                            </TableCell>


                                            {/* ACTIONS */}

                                            <TableCell>

                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        gap: 1
                                                    }}
                                                >

                                                    {/* VIEW */}

                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        onClick={() =>
                                                            navigate(
                                                                `/employees/${employee.id}`
                                                            )
                                                        }
                                                    >
                                                        View
                                                    </Button>


                                                    {/* EDIT */}

                                                    <Button
                                                        size="small"
                                                        color="warning"
                                                        variant="contained"
                                                        onClick={() =>
                                                            navigate(
                                                                `/employees/${employee.id}/edit`
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </Button>


                                                    {/* DELETE */}

                                                    <Button
                                                        size="small"
                                                        color="error"
                                                        variant="contained"
                                                        onClick={() => {

                                                            if (onDelete) {
                                                                onDelete(
                                                                    employee.id
                                                                );
                                                            }

                                                        }}
                                                    >
                                                        Delete
                                                    </Button>

                                                </Box>

                                            </TableCell>

                                        </TableRow>

                                    ))}

                                </TableBody>

                            </Table>

                        </TableContainer>


                    ) : (


                        /* ========================= */
                        /* EMPTY STATE */
                        /* ========================= */

                        <Box
                            sx={{
                                textAlign: "center",
                                py: 6,
                                px: 2,
                                color: "text.secondary"
                            }}
                        >

                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                gutterBottom
                            >
                                👥 No Employees Found
                            </Typography>


                            <Typography variant="body2">

                                There are no employees to display.

                            </Typography>


                            {/* SHOW ADD BUTTON ONLY ON ALL EMPLOYEES PAGE */}

                            {title === "All Employees" && (

                                <Button
                                    variant="contained"
                                    sx={{ mt: 2 }}
                                    onClick={() =>
                                        navigate("/add")
                                    }
                                >
                                    Add Employee
                                </Button>

                            )}

                        </Box>

                    )

                )}


                {/* ========================= */}
                {/* VIEW ALL BUTTON */}
                {/* ========================= */}

                {!loading &&
                    showButton &&
                    employees.length > 0 && (

                        <Button
                            variant="contained"
                            sx={{ mt: 2 }}
                            onClick={() =>
                                navigate("/employees")
                            }
                        >
                            View All Employees
                        </Button>

                    )}

            </CardContent>

        </Card>
    );
}


export default RecentEmployees;