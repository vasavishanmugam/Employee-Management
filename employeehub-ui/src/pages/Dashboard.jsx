import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import SearchIcon from "@mui/icons-material/Search";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import api from "../services/api";
import RecentEmployees from "../components/dashboard/RecentEmployees";
import "./Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEmployees();
    }, []);

    async function fetchEmployees() {
        try {
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
            console.error("Failed to fetch employees:", error);
            setEmployees([]);
        } finally {
            setLoading(false);
        }
    }

    const totalEmployees = employees.length;

    const totalSalary = employees.reduce(
        (total, employee) =>
            total + Number(employee.salary || 0),
        0
    );

    const newEmployees = employees.slice(0, 5);

    return (
        <div className="dashboard-page">

            <div className="dashboard-heading">
                <div>
                    <h1>Dashboard</h1>
                    <p>
                        Welcome back! Here's an overview of your employees.
                    </p>
                </div>

                <div className="dashboard-date">
                    📅 {new Date().toLocaleDateString("en-IN")}
                </div>
            </div>

            {/* SUMMARY CARDS */}

            <div className="summary-cards">

                <div className="summary-card">
                    <div className="summary-icon blue">
                        <PeopleIcon />
                    </div>

                    <div>
                        <span>Total Employees</span>
                        <h2>{totalEmployees}</h2>
                        <small>Employee count</small>
                    </div>
                </div>

                <div className="summary-card">
                    <div className="summary-icon green">
                        <PeopleIcon />
                    </div>

                    <div>
                        <span>Active Employees</span>
                        <h2>—</h2>
                        <small>Status not configured</small>
                    </div>
                </div>

                <div className="summary-card">
                    <div className="summary-icon purple">
                        <AccountBalanceWalletIcon />
                    </div>

                    <div>
                        <span>Total Salary</span>
                        <h2>
                            ₹{totalSalary.toLocaleString("en-IN")}
                        </h2>
                        <small>Current payroll</small>
                    </div>
                </div>

                <div className="summary-card">
                    <div className="summary-icon orange">
                        <PersonAddIcon />
                    </div>

                    <div>
                        <span>New Employees</span>
                        <h2>{newEmployees.length}</h2>
                        <small>This month</small>
                    </div>

                    <button
                        className="card-view-all"
                        onClick={() => navigate("/employees")}
                    >
                        View All
                    </button>
                </div>

            </div>

            {/* MIDDLE SECTION */}

            <div className="dashboard-middle">

                <div className="dashboard-card overview-card">

                    <div className="card-header">
                        <div>
                            <h3>Employees Overview</h3>
                            <p>Recently added employees</p>
                        </div>

                        <span className="chart-label">
                            ● New Employees
                        </span>
                    </div>

                    <div className="overview-chart">

                        <div className="chart-grid">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>

                        <div className="chart-line">
                            <div className="chart-point p1"></div>
                            <div className="chart-point p2"></div>
                            <div className="chart-point p3"></div>
                            <div className="chart-point p4"></div>
                            <div className="chart-point p5"></div>
                            <div className="chart-point p6"></div>
                        </div>

                        <div className="chart-months">
                            <span>Mar</span>
                            <span>Apr</span>
                            <span>May</span>
                            <span>Jun</span>
                            <span>Jul</span>
                            <span>Aug</span>
                        </div>

                    </div>

                </div>

                <div className="dashboard-card activities-card">

                    <div className="card-header">
                        <div>
                            <h3>Recent Activities</h3>
                            <p>Latest employee activity</p>
                        </div>

                        <span className="activity-icon">◷</span>
                    </div>

                    <div className="empty-state">
                        <div>◷</div>
                        <h4>Activity tracking</h4>
                        <p>
                            Activity history will appear here when
                            configured.
                        </p>
                    </div>

                </div>

            </div>

            {/* BOTTOM SECTION */}

            <div className="dashboard-bottom">

                <div className="dashboard-card recent-card">

                    <div className="card-header">
                        <div>
                            <h3>Recent Employees</h3>
                            <p>Recently added employees</p>
                        </div>

                        <button
                            className="card-view-all"
                            onClick={() => navigate("/employees")}
                        >
                            View All →
                        </button>
                    </div>

                    {loading ? (
                        <div className="dashboard-loading">
                            Loading employees...
                        </div>
                    ) : (
                        <RecentEmployees
                            employees={employees}
                            onRefresh={fetchEmployees}
                        />
                    )}

                </div>

                <div className="dashboard-right">

                    {/* BIRTHDAYS */}

                    <div className="dashboard-card">

                        <div className="card-header">
                            <div>
                                <h3>Upcoming Birthdays</h3>
                                <p>Employee birthdays</p>
                            </div>

                            <span>📅</span>
                        </div>

                        <div className="empty-state small">
                            <div>📅</div>
                            <p>
                                Add a birthday field to display
                                upcoming birthdays.
                            </p>
                        </div>

                    </div>

                    {/* QUICK ACTIONS */}

                    <div className="dashboard-card">

                        <div className="card-header">
                            <div>
                                <h3>Quick Actions</h3>
                                <p>Common tasks</p>
                            </div>
                        </div>

                        <div className="quick-actions">

                            <button
                                className="quick-btn blue-btn"
                                onClick={() => navigate("/add")}
                            >
                                <PersonAddIcon />
                                Add Employee
                            </button>

                            <button
                                className="quick-btn green-btn"
                                onClick={() => navigate("/employees")}
                            >
                                <SearchIcon />
                                Search Employees
                            </button>

                            <button
                                className="quick-btn purple-btn"
                                onClick={() => navigate("/upload")}
                            >
                                <UploadFileIcon />
                                Upload Files
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;