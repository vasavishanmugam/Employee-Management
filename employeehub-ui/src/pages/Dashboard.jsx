import { useEffect, useState } from "react";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardStats from "../components/dashboard/DashboardStats";
import RecentEmployees from "../components/dashboard/RecentEmployees";
import SalaryChart from "../components/SalaryChart";

import api from "../services/api";

function Dashboard() {

    const [dashboard, setDashboard] = useState({
        totalEmployees: 0,
        highestSalary: 0,
        lowestSalary: 0,
        averageSalary: 0
    });

    const [employees, setEmployees] = useState([]);

    const [loading, setLoading] = useState(true);


    async function fetchDashboard() {

        try {

            const response = await api.get(
                "/employees/dashboard"
            );

            setDashboard(
                response.data.data
            );

        } catch (error) {

            console.error(
                "Failed to fetch dashboard:",
                error
            );

        }
    }


    async function fetchEmployees() {

        try {

            const response = await api.get(
                "/employees/filter?name=&page=0&size=5&sort=name,asc"
            );

            setEmployees(
                response.data.data.content
            );

        } catch (error) {

            console.error(
                "Failed to fetch employees:",
                error
            );

        }
    }


    async function loadDashboard() {

        try {

            setLoading(true);

            await Promise.all([
                fetchDashboard(),
                fetchEmployees()
            ]);

        } finally {

            setLoading(false);

        }
    }


    async function deleteEmployee(id) {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this employee?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await api.delete(
                `/employees/${id}`
            );

            alert(
                "Employee deleted successfully."
            );

            // Refresh dashboard data
            await loadDashboard();

        } catch (error) {

            console.error(
                "Failed to delete employee:",
                error
            );

            alert(
                "Failed to delete employee."
            );
        }
    }


    useEffect(() => {

        loadDashboard();

    }, []);


    return (
        <>
            <DashboardHeader />

            <div style={{ padding: "24px" }}>

                <h2 style={{ marginBottom: "20px" }}>
                    Dashboard
                </h2>


                {loading ? (

                    <p>
                        Loading dashboard...
                    </p>

                ) : (

                    <>

                        {/* DASHBOARD CARDS */}

                        <DashboardStats
                            dashboard={dashboard}
                        />


                        {/* SALARY CHART */}

                        <SalaryChart
                            employees={employees}
                            loading={loading}
                        />


                        {/* RECENT EMPLOYEES */}

                        <RecentEmployees
                            employees={employees}
                            onDelete={deleteEmployee}
                        />

                    </>

                )}

            </div>
        </>
    );
}

export default Dashboard;