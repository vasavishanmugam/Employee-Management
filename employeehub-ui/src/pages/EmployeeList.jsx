import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

import api from "../services/api";
import "./EmployeeList.css";

function EmployeeList() {

    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [sortBy, setSortBy] = useState("id");

    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        fetchEmployees();
    }, []);

    async function fetchEmployees() {

        try {

            setLoading(true);

            const response = await api.get("/employees");

            const result = response.data?.data ?? response.data;

            if (Array.isArray(result)) {

                setEmployees(result);

            } else if (Array.isArray(result?.content)) {

                setEmployees(result.content);

            } else {

                setEmployees([]);
            }

        } catch (error) {

            console.error(
                "Failed to fetch employees:",
                error
            );

            setEmployees([]);

        } finally {

            setLoading(false);
        }
    }

    async function deleteEmployee(id) {

        const confirmed = window.confirm(
            "Are you sure you want to delete this employee?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await api.delete(`/employees/${id}`);

            alert("Employee deleted successfully.");

            fetchEmployees();

        } catch (error) {

            console.error(
                "Delete employee failed:",
                error
            );

            alert("Failed to delete employee.");
        }
    }

    function getProfileImage(employee) {

        if (employee.profileImage) {
            return `http://localhost:8080/uploads/profile/${employee.profileImage}`;
        }

        return "/images/default-avatar.png";
    }

    const filteredEmployees = employees
        .filter((employee) => {

            const value = search.toLowerCase();

            return (
                String(employee.id)
                    .toLowerCase()
                    .includes(value) ||

                employee.name
                    ?.toLowerCase()
                    .includes(value) ||

                employee.email
                    ?.toLowerCase()
                    .includes(value)
            );
        })
        .sort((a, b) => {

            let first;
            let second;

            if (sortBy === "id") {

                first = Number(a.id);
                second = Number(b.id);

            } else if (sortBy === "name") {

                first = (a.name || "").toLowerCase();
                second = (b.name || "").toLowerCase();

            } else if (sortBy === "salary") {

                first = Number(a.salary || 0);
                second = Number(b.salary || 0);

            } else {

                first = a.email || "";
                second = b.email || "";
            }

            if (first < second) {
                return sortOrder === "asc" ? -1 : 1;
            }

            if (first > second) {
                return sortOrder === "asc" ? 1 : -1;
            }

            return 0;
        });

    function handleSortChange(event) {

        const value = event.target.value;

        setSortBy(value);
        setSortOrder("asc");
    }

    return (
        <div className="employee-list-page">

            {/* PAGE HEADER */}

            <div className="employee-list-header">

                <div>
                    <h1>Employees</h1>
                    <p>
                        Manage all employees in your organization.
                    </p>
                </div>

                <button
                    className="add-employee-btn"
                    onClick={() => navigate("/add")}
                >
                    + Add Employee
                </button>

            </div>

            {/* TOOLBAR */}

            <div className="employee-toolbar">

                <div className="search-box">

                    <SearchIcon />

                    <input
                        type="text"
                        placeholder="Search employees..."
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                    />

                </div>

                <div className="sort-box">

                    <label>
                        Sort by
                    </label>

                    <select
                        value={sortBy}
                        onChange={handleSortChange}
                    >
                        <option value="id">
                            ID
                        </option>

                        <option value="name">
                            Name
                        </option>

                        <option value="email">
                            Email
                        </option>

                        <option value="salary">
                            Salary
                        </option>

                    </select>

                    <button
                        className="sort-order-btn"
                        onClick={() =>
                            setSortOrder(
                                sortOrder === "asc"
                                    ? "desc"
                                    : "asc"
                            )
                        }
                    >
                        {sortOrder === "asc" ? "↑" : "↓"}
                    </button>

                </div>

            </div>

            {/* TABLE */}

            <div className="employee-list-card">

                {loading ? (

                    <div className="employee-list-loading">
                        Loading employees...
                    </div>

                ) : filteredEmployees.length === 0 ? (

                    <div className="employee-list-empty">

                        <h2>
                            No employees found
                        </h2>

                        <p>
                            Try changing your search.
                        </p>

                    </div>

                ) : (

                    <div className="employee-list-table">

                        <div className="employee-list-table-header">

                            <span>ID</span>
                            <span>Employee</span>
                            <span>Email</span>
                            <span>Salary</span>
                            <span>Actions</span>

                        </div>

                        {filteredEmployees.map(
                            (employee) => (

                                <div
                                    className="employee-list-row"
                                    key={employee.id}
                                >

                                    <span>
                                        {employee.id}
                                    </span>

                                    <div className="employee-list-name">

                                        <img
                                            src={getProfileImage(
                                                employee
                                            )}
                                            alt={
                                                employee.name
                                            }
                                        />

                                        <div>
                                            <strong>
                                                {employee.name}
                                            </strong>
                                        </div>

                                    </div>

                                    <span>
                                        {employee.email}
                                    </span>

                                    <strong>
                                        ₹
                                        {Number(
                                            employee.salary || 0
                                        ).toLocaleString(
                                            "en-IN"
                                        )}
                                    </strong>

                                    <div className="employee-list-actions">

                                        <button
                                            className="list-action view"
                                            title="View employee"
                                            onClick={() =>
                                                navigate(
                                                    `/employees/${employee.id}`
                                                )
                                            }
                                        >
                                            <VisibilityIcon />
                                        </button>

                                        <button
                                            className="list-action edit"
                                            title="Edit employee"
                                            onClick={() =>
                                                navigate(
                                                    `/employees/${employee.id}/edit`
                                                )
                                            }
                                        >
                                            <EditIcon />
                                        </button>

                                        <button
                                            className="list-action delete"
                                            title="Delete employee"
                                            onClick={() =>
                                                deleteEmployee(
                                                    employee.id
                                                )
                                            }
                                        >
                                            <DeleteIcon />
                                        </button>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>

        </div>
    );
}

export default EmployeeList;