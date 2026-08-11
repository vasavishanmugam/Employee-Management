import { useEffect, useState } from "react";
import api from "../services/api";
import "../App.css";

import SalaryChart from "../components/SalaryChart";
import DashboardStats from "../components/dashboard/DashboardStats";
import RecentEmployees from "../components/dashboard/RecentEmployees";

import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Paper
} from "@mui/material";

function EmployeeList() {

    // =========================
    // Employee State
    // =========================

    const [employees, setEmployees] = useState([]);

    const [search, setSearch] = useState("");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [salary, setSalary] = useState("");

    const [editingId, setEditingId] = useState(null);

    // =========================
    // Pagination
    // =========================

    const [page, setPage] = useState(0);
    const [size] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    // =========================
    // Sorting
    // =========================

    const [sort, setSort] = useState("name,asc");

    // =========================
    // Search Debounce
    // =========================

    const [debouncedSearch, setDebouncedSearch] = useState("");

    // =========================
    // Loading
    // =========================

    const [loading, setLoading] = useState(false);

    // =========================
    // Dashboard State
    // =========================

    const [dashboard, setDashboard] = useState({
        totalEmployees: 0,
        highestSalary: 0,
        lowestSalary: 0,
        averageSalary: 0
    });


    // =====================================================
    // FETCH EMPLOYEES
    // =====================================================

    async function fetchEmployees() {

        try {

            setLoading(true);

            const keyword = debouncedSearch.trim();

            const response = await api.get(
                `/employees/filter?name=${encodeURIComponent(keyword)}&page=${page}&size=${size}&sort=${sort}`
            );

            setEmployees(response.data.data.content);

            setTotalPages(
                response.data.data.totalPages
            );

        } catch (error) {

            console.log("Fetch employees error:", error);

        } finally {

            setLoading(false);

        }
    }


    // =====================================================
    // FETCH DASHBOARD
    // =====================================================

    async function fetchDashboard() {

        try {

            const response =
                await api.get("/employees/dashboard");

            setDashboard(response.data.data);

        } catch (error) {

            console.log("Fetch dashboard error:", error);

        }
    }


    // =====================================================
    // INITIAL / FILTER FETCH
    // =====================================================

    useEffect(() => {

        fetchEmployees();
        fetchDashboard();

    }, [page, sort, debouncedSearch]);


    // =====================================================
    // SEARCH DEBOUNCE
    // =====================================================

    useEffect(() => {

        const timer = setTimeout(() => {

            setDebouncedSearch(search);

            // When searching, start from first page
            setPage(0);

        }, 500);

        return () => clearTimeout(timer);

    }, [search]);


    // =====================================================
    // ADD / UPDATE EMPLOYEE
    // =====================================================

    async function handleSubmit() {

        // Validation

        if (!name.trim()) {

            alert("Name is required.");
            return;

        }

        if (!email.trim()) {

            alert("Email is required.");
            return;

        }

        if (!salary) {

            alert("Salary is required.");
            return;

        }


        const employee = {

            name: name.trim(),

            email: email.trim(),

            salary: Number(salary)

        };


        try {

            let response;


            // =========================
            // UPDATE
            // =========================

            if (editingId) {

                response = await api.put(
                    `/employees/${editingId}`,
                    employee
                );

                alert("Employee updated successfully.");

            }

            // =========================
            // ADD
            // =========================

            else {

                response = await api.post(
                    "/employees",
                    employee
                );

                alert("Employee added successfully.");

            }


            console.log(
                "Employee response:",
                response.data
            );


            // Refresh employee table
            await fetchEmployees();

            // Refresh dashboard cards
            await fetchDashboard();

            // Clear form
            resetForm();


        } catch (error) {

            console.log(
                "Save employee error:",
                error
            );

            alert(
                editingId
                    ? "Failed to update employee."
                    : "Failed to add employee."
            );

        }

    }


    // =====================================================
    // EDIT EMPLOYEE
    // =====================================================

    function editEmployee(employee) {

        setEditingId(employee.id);

        setName(employee.name);

        setEmail(employee.email);

        setSalary(employee.salary);

    }


    // =====================================================
    // RESET FORM
    // =====================================================

    function resetForm() {

        setName("");

        setEmail("");

        setSalary("");

        setEditingId(null);

    }


    // =====================================================
    // CANCEL EDIT
    // =====================================================

    function cancelEdit() {

        resetForm();

    }


    // =====================================================
    // DELETE EMPLOYEE
    // =====================================================

    async function deleteEmployee(id) {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this employee?"
            );


        if (!confirmDelete) {

            return;

        }


        try {

            // Delete from backend

            await api.delete(
                `/employees/${id}`
            );


            alert(
                "Employee deleted successfully."
            );


            // IMPORTANT:
            // Refresh employee list

            await fetchEmployees();


            // IMPORTANT:
            // Refresh dashboard cards

            await fetchDashboard();


        } catch (error) {

            console.log(
                "Delete employee error:",
                error
            );

            alert(
                "Failed to delete employee."
            );

        }

    }


    // =====================================================
    // UI
    // =====================================================

    return (

        <>

            {/* =========================
                PAGE TITLE
            ========================= */}

            <h2 className="title">
                Dashboard
            </h2>


            {/* =========================
                DASHBOARD CARDS
            ========================= */}

            <DashboardStats
                dashboard={dashboard}
            />


            {/* =========================
                SALARY CHART
            ========================= */}

            <SalaryChart
                employees={employees}
                loading={loading}
            />


            {/* =========================
                RECENT EMPLOYEES
            ========================= */}

            <RecentEmployees
                employees={employees.slice(0, 5)}
                onDelete={deleteEmployee}
            />


            {/* =========================
                SORT
            ========================= */}

            <div className="sort-container">

                <FormControl
                    sx={{ minWidth: 220 }}
                >

                    <InputLabel>
                        Sort By
                    </InputLabel>


                    <Select

                        value={sort}

                        label="Sort By"

                        onChange={(e) => {

                            setSort(
                                e.target.value
                            );

                            setPage(0);

                        }}

                    >

                        <MenuItem value="name,asc">
                            Name (A-Z)
                        </MenuItem>

                        <MenuItem value="name,desc">
                            Name (Z-A)
                        </MenuItem>

                        <MenuItem value="salary,asc">
                            Salary (Low-High)
                        </MenuItem>

                        <MenuItem value="salary,desc">
                            Salary (High-Low)
                        </MenuItem>

                        <MenuItem value="email,asc">
                            Email (A-Z)
                        </MenuItem>

                        <MenuItem value="email,desc">
                            Email (Z-A)
                        </MenuItem>

                    </Select>

                </FormControl>

            </div>


            {/* =========================
                ADD / UPDATE FORM
            ========================= */}

            <Paper

                elevation={3}

                sx={{

                    p: 3,

                    mb: 3,

                    borderRadius: 3

                }}

            >

                <h2
                    style={{
                        marginBottom: 20
                    }}
                >

                    {editingId
                        ? "Update Employee"
                        : "Add Employee"}

                </h2>


                <div

                    style={{

                        display: "flex",

                        gap: "15px",

                        alignItems: "center"

                    }}

                >

                    {/* NAME */}

                    <TextField

                        label="Employee Name"

                        value={name}

                        onChange={(e) =>
                            setName(e.target.value)
                        }

                        sx={{
                            flex: 2
                        }}

                    />


                    {/* EMAIL */}

                    <TextField

                        label="Email"

                        value={email}

                        onChange={(e) =>
                            setEmail(e.target.value)
                        }

                        sx={{
                            flex: 2
                        }}

                    />


                    {/* SALARY */}

                    <TextField

                        label="Salary"

                        type="number"

                        value={salary}

                        onChange={(e) =>
                            setSalary(e.target.value)
                        }

                        sx={{
                            width: 180
                        }}

                    />


                    {/* ADD / UPDATE BUTTON */}

                    <Button

                        variant="contained"

                        size="large"

                        onClick={handleSubmit}

                    >

                        {editingId
                            ? "Update"
                            : "Add"}

                    </Button>


                    {/* CANCEL */}

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


            {/* =========================
                SEARCH
            ========================= */}

            <div className="search-container">

                <TextField

                    fullWidth

                    label="Search Employee"

                    variant="outlined"

                    value={search}

                    onChange={(e) =>
                        setSearch(e.target.value)
                    }

                />

            </div>


            {/* =========================
                EMPLOYEE TABLE TITLE
            ========================= */}

            <h3 className="title">
                Employee Table
            </h3>


            {/* =========================
                YOUR EXISTING EMPLOYEE TABLE
                GOES HERE
            ========================= */}

        </>

    );

}

export default EmployeeList;