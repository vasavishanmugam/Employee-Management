import { useEffect, useState } from "react";
import api from "../services/api";
import RecentEmployees from "../components/dashboard/RecentEmployees";
import "./Employees.css";

function Employees() {
    const [employees, setEmployees] = useState([]);
    const [page, setPage] = useState(0);
    const [size] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);

    async function fetchEmployees() {
        try {
            setLoading(true);

            const response = await api.get(
                `/employees/filter?page=${page}&size=${size}&sort=name,asc`
            );

            const pageData = response.data.data;

            setEmployees(pageData.content);
            setTotalPages(pageData.totalPages);

        } catch (error) {
            console.error("Failed to fetch employees:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchEmployees();
    }, [page]);

    return (
        <div className="employees-page">

            {loading && (
                <p className="employees-loading">
                    Loading employees...
                </p>
            )}

            <RecentEmployees
            employees={employees}
            title="All Employees"
            showButton={false}
            showPagination={true}
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            onRefresh={fetchEmployees}
        />

        </div>
    );
}

export default Employees;