import { useNavigate } from "react-router-dom";
import "./RecentEmployees.css";

function RecentEmployees({
    employees = [],
    onRefresh,
    title = "Recent Employees",
    showButton = true,
    showPagination = false,
    currentPage = 0,
    totalPages = 0,
    onPageChange
}) {
    const navigate = useNavigate();

    return (
        <div className="recent-employees">

            {/* Header */}
            <div className="recent-header">

                <h2>{title}</h2>

                {showButton && (
                    <button
                        className="view-all-btn"
                        onClick={() => navigate("/employees")}
                    >
                        View All
                    </button>
                )}

            </div>

            {/* Employee List */}
            {employees.length === 0 ? (

                <div className="no-employees">
                    No employees found.
                </div>

            ) : (

                <div className="employee-list">

                    {employees.map((employee) => (

                        <div
                            className="employee-row"
                            key={employee.id}
                        >

                            {/* Profile Image */}
                            <img
                                src={
                                    employee.profileImage
                                        ? `http://localhost:8080/uploads/profile/${employee.profileImage}`
                                        : "/images/default-avatar.png"
                                }
                                alt={employee.name}
                                className="employee-avatar"
                            />

                            {/* Employee Information */}
                            <div className="employee-info">

                                <h3>
                                    {employee.name}
                                </h3>

                                <p>
                                    {employee.email}
                                </p>

                            </div>

                            {/* Salary */}
                            <div className="employee-salary">

                                ₹
                                {employee.salary?.toLocaleString(
                                    "en-IN"
                                )}

                            </div>

                            {/* View Button */}
                            <button
                                className="view-btn"
                                onClick={() =>
                                    navigate(
                                        `/employees/${employee.id}`
                                    )
                                }
                            >
                                View
                            </button>

                        </div>

                    ))}

                </div>

            )}

            {/* Pagination */}
            {showPagination && totalPages > 1 && (

                <div className="pagination">

                    <button
                        className="pagination-btn"
                        disabled={currentPage === 0}
                        onClick={() =>
                            onPageChange(currentPage - 1)
                        }
                    >
                        Previous
                    </button>

                    <span className="page-info">
                        Page {currentPage + 1} of {totalPages}
                    </span>

                    <button
                        className="pagination-btn"
                        disabled={
                            currentPage === totalPages - 1
                        }
                        onClick={() =>
                            onPageChange(currentPage + 1)
                        }
                    >
                        Next
                    </button>

                </div>

            )}

        </div>
    );
}

export default RecentEmployees;