import { useEffect, useState } from "react";
import api from "../services/api";

import RecentEmployees from "../components/dashboard/RecentEmployees";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

function Employees() {

    const [employees, setEmployees] = useState([]);

    // Spring Boot uses 0-based pages
    const [page, setPage] = useState(0);

    // Employees per page
    const [size] = useState(5);

    // Total pages from backend
    const [totalPages, setTotalPages] = useState(0);

    const [loading, setLoading] = useState(false);


    // =========================
    // FETCH EMPLOYEES
    // =========================

    async function fetchEmployees() {

        try {

            setLoading(true);

            const response = await api.get(
                `/employees/filter?page=${page}&size=${size}&sort=name,asc`
            );

            console.log(
                "Employee page data:",
                response.data.data
            );

            setEmployees(
                response.data.data.content
            );

            setTotalPages(
                response.data.data.totalPages
            );

        } catch (error) {

            console.error(
                "Failed to fetch employees:",
                error
            );

        } finally {

            setLoading(false);

        }
    }


    // =========================
    // DELETE EMPLOYEE
    // =========================

    async function deleteEmployee(id) {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this employee?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await api.delete(`/employees/${id}`);

            alert("Employee deleted successfully.");

            /*
             * Refresh current page after delete.
             */
            await fetchEmployees();

            /*
             * If the current page becomes empty after deleting
             * the last employee on that page, move to previous page.
             */
            if (employees.length === 1 && page > 0) {
                setPage(page - 1);
            }

        } catch (error) {

            console.error(
                "Failed to delete employee:",
                error
            );

            alert("Failed to delete employee.");

        }
    }


    // =========================
    // FETCH WHEN PAGE CHANGES
    // =========================

    useEffect(() => {

        fetchEmployees();

    }, [page]);


    // =========================
    // UI
    // =========================

    return (
        <>

            {loading && (
                <p style={{ textAlign: "center" }}>
                    Loading employees...
                </p>
            )}


            <RecentEmployees
                employees={employees}
                title="All Employees"
                showButton={false}
                onDelete={deleteEmployee}
            />


            {/* PAGINATION */}

            {totalPages > 1 && (

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: 3,
                        mb: 4
                    }}
                >

                    <Stack spacing={2}>

                        <Pagination
                            count={totalPages}
                            page={page + 1}
                            color="primary"
                            shape="rounded"
                            onChange={(event, value) => {

                                setPage(value - 1);

                            }}
                        />

                    </Stack>

                </Box>

            )}

        </>
    );
}

export default Employees;