import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import "./EmployeeDetails.css";
import { useNavigate } from "react-router-dom";


function EmployeeDetails () {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployee();
    }, [id])

    async function fetchEmployee() {
        try {
            const response = await api.get(`/employees/${id}`);
            setEmployee(response.data.data);
        }
        catch(error)
        {
            console.log(error);
        }
    }

    if (!employee)
    {
        return <h2>Loading....</h2>;
    }

    return (
        <div className="details-container">
            <img 
                src={
                    employee.profileImage 
                    ? `http://localhost:8080/uploads/profile/${employee.profileImage}`
                    : "/images/default-avatar.png"
                }
                alt={employee.name}
                className="details-image"
            />

            <h2>{employee.name}</h2>

            <p>
                <strong>Email:</strong> {employee.email}
            </p>

            <p>
                <strong>Salary:</strong> ₹{employee.salary.toLocaleString("en-IN")}
            </p>

            <p>
                <strong>Resume:</strong>{" "}
                {employee.resumeFile ? (
                    <a 
                        href={`httP://localhost:8080/uploads/resumes/${employee.resumeFile}`}
                        target="_blank"
                        rel="noreferrer"
                        >
                        Download Resume
                    </a>
                ) : (
                    "No Resume"
                )}
            </p>

            <button
                className="back-btn"
                onClick={() => navigate("/")}>
                Back
            </button>
        </div>
    );
}

export default EmployeeDetails;