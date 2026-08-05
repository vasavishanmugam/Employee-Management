import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import "./EmployeeDetails.css";
import { useNavigate } from "react-router-dom";


function EmployeeDetails () {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState(null);
    const [resumeFile, setResumeFile] = useState(null);

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

    async function uploadProfileImage() {
        if(!profileImage)
        {
            alert("Please select an image");
            return;
        }

        const formData = new FormData();

        formData.append("file", profileImage);

        try{
            await api.post(
                `/employees/${id}/profile-image`,
                formData,
                {
                    headers: {
                        "Content-Type" : "multipart/form-data"
                    }
                }
            );

            alert("Profile image uploaded successfully.");
            fetchEmployee();
        }
        catch(error)
        {
            console.log(error);
            alert("Failed to upload image.");
        }    
    }

    async function uploadResume() {
        if (!resumeFile)
        {
            alert("Please select a PDF.");
            return;
        }

        const formData = new FormData();

        formData.append("file", resumeFile);

        try{
            await api.post(
                `/employees/${id}/resume`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            alert("Resume uploaded successfully.");

            fetchEmployee();
        }
        catch(error){
            console.log(error);

            alert("Resume upload failed.");
        }
    }

    async function deleteEmployee(){
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this employee?"
        );

        if (!confirmDelete)
        {
            return;
        }

        try{
            await api.delete(`/employees/${id}`);
            alert("Employee deleted successfully.");
            navigate("/");
        } catch(error){
            console.log(error);
            alert("Employee deleted successfully.");
        }
    }

    return (
    <div className="details-container">

        <h2 className="details-title">Employee Details</h2>

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

        <div className="employee-info">

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
                        href={`http://localhost:8080/uploads/resume/${employee.resumeFile}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Download Resume
                    </a>
                ) : (
                    "No Resume"
                )}
            </p>

        </div>

        <hr />

        <h3 className="section-title">Manage Files</h3>

        <div className="upload-group">

            <label>📷 Profile Image</label>

            <div className="upload-row">

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfileImage(e.target.files[0])}
                />

                <button
                    className="upload-btn"
                    onClick={uploadProfileImage}
                >
                    Upload
                </button>

            </div>

        </div>

        <div className="upload-group">

            <label>📄 Resume</label>

            <div className="upload-row">

                <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setResumeFile(e.target.files[0])}
                />

                <button
                    className="upload-btn"
                    onClick={uploadResume}
                >
                    Upload
                </button>

            </div>

        </div>

        <hr />

        <div className="action-buttons">

            <button
                className="edit-btn"
                onClick={() => navigate(`/?edit=${employee.id}`)}
            >
                Edit Employee
            </button>

            <button
                className="delete-btn"
                onClick={deleteEmployee}
            >
                Delete Employee
            </button>

            <button
                className="back-btn"
                onClick={() => navigate("/")}
            >
                Back
            </button>

        </div>

    </div>
);
}

export default EmployeeDetails;