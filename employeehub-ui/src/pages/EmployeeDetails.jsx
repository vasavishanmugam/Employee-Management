import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../services/api";
import "./EmployeeDetails.css";

function EmployeeDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState(null);

    const [profileImage, setProfileImage] = useState(null);
    const [resumeFile, setResumeFile] = useState(null);

    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [error, setError] = useState("");
    const [deleting, setDeleting] = useState(false);

    // ==========================================
    // FETCH EMPLOYEE
    // ==========================================

    useEffect(() => {
        fetchEmployee();
    }, [id]);


    async function fetchEmployee() {

        try {

            setLoading(true);
            setEmployee(null);
            setNotFound(false);
            setError("");

            const response = await api.get(
                `/employees/${id}`
            );

            console.log(
                "Employee details:",
                response.data.data
            );

            setEmployee(
                response.data.data
            );

        }
        catch (error) {

            console.error(
                "Failed to fetch employee:",
                error
            );

            // Employee does not exist
            if (error.response?.status === 404) {

                setNotFound(true);

            }
            else {

                // Server / network / other error
                setError(
                    "Unable to load employee details."
                );

            }

        }
        finally {

            setLoading(false);

        }

    }


    // ==========================================
    // UPLOAD PROFILE IMAGE
    // ==========================================

    async function uploadProfileImage() {

        if (!profileImage) {

            alert(
                "Please select an image."
            );

            return;

        }

        const formData = new FormData();

        formData.append(
            "file",
            profileImage
        );

        try {

            await api.post(
                `/employees/${id}/profile-image`,
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data"
                    }
                }
            );

            alert(
                "Profile image uploaded successfully."
            );

            setProfileImage(null);

            await fetchEmployee();

        }
        catch (error) {

            console.error(
                "Profile image upload failed:",
                error
            );

            alert(
                "Failed to upload profile image."
            );

        }

    }


    // ==========================================
    // UPLOAD RESUME
    // ==========================================

    async function uploadResume() {

        if (!resumeFile) {

            alert(
                "Please select a PDF."
            );

            return;

        }

        const formData = new FormData();

        formData.append(
            "file",
            resumeFile
        );

        try {

            await api.post(
                `/employees/${id}/resume`,
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data"
                    }
                }
            );

            alert(
                "Resume uploaded successfully."
            );

            setResumeFile(null);

            await fetchEmployee();

        }
        catch (error) {

            console.error(
                "Resume upload failed:",
                error
            );

            alert(
                "Resume upload failed."
            );

        }

    }


    // ==========================================
    // DELETE EMPLOYEE
    // ==========================================

   async function deleteEmployee() {

    const confirmDelete = window.confirm(
        `Are you sure you want to delete ${employee.name}?`
    );

    if (!confirmDelete) {
        return;
    }

    try {

        setDeleting(true);

        await api.delete(`/employees/${id}`);

        alert("Employee deleted successfully.");

        navigate("/employees");

    } catch (error) {

        console.error(
            "Failed to delete employee:",
            error
        );

        // Employee was not found
        if (error.response?.status === 404) {

            alert("Employee not found.");

            navigate("/employees");

            return;
        }

        alert(
            "Failed to delete employee. Please try again."
        );

    } finally {

        setDeleting(false);

    }
}

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="details-container">

                <h2>
                    Loading employee...
                </h2>

            </div>

        );

    }


    // ==========================================
    // EMPLOYEE NOT FOUND
    // ==========================================

    if (notFound) {

        return (

            <div className="details-container">

                <h2>
                    Employee Not Found
                </h2>

                <p>
                    No employee was found with ID{" "}
                    <strong>{id}</strong>.
                </p>

                <button
                    className="back-btn"
                    onClick={() =>
                        navigate("/employees")
                    }
                >
                    Back to Employees
                </button>

            </div>

        );

    }


    // ==========================================
    // API / SERVER ERROR
    // ==========================================

    if (error) {

        return (

            <div className="details-container">

                <h2>
                    Unable to Load Employee
                </h2>

                <p>
                    {error}
                </p>

                <button
                    className="back-btn"
                    onClick={() =>
                        navigate("/employees")
                    }
                >
                    Back to Employees
                </button>

            </div>

        );

    }


    // ==========================================
    // SAFETY CHECK
    // ==========================================

    if (!employee) {

        return (

            <div className="details-container">

                <h2>
                    Employee Not Found
                </h2>

                <p>
                    No employee was found with ID{" "}
                    <strong>{id}</strong>.
                </p>

                <button
                    className="back-btn"
                    onClick={() =>
                        navigate("/employees")
                    }
                >
                    Back to Employees
                </button>

            </div>

        );

    }


    // ==========================================
    // EMPLOYEE DETAILS
    // ==========================================

    return (

        <div className="details-container">

            <h2 className="details-title">
                Employee Details
            </h2>


            {/* PROFILE IMAGE */}

            <img
                src={
                    employee.profileImage
                        ? `http://localhost:8080/uploads/profile/${employee.profileImage}`
                        : "/images/default-avatar.png"
                }
                alt={employee.name}
                className="details-image"
            />


            {/* NAME */}

            <h2>
                {employee.name}
            </h2>


            {/* EMPLOYEE INFORMATION */}

            <div className="employee-info">

                <p>
                    <strong>ID:</strong>{" "}
                    {employee.id}
                </p>

                <p>
                    <strong>Email:</strong>{" "}
                    {employee.email}
                </p>

                <p>
                    <strong>Salary:</strong>{" "}
                    ₹
                    {Number(
                        employee.salary || 0
                    ).toLocaleString("en-IN")}
                </p>

                <p>

                    <strong>
                        Resume:
                    </strong>{" "}

                    {employee.resumeFile ? (

                        <a
                            href={
                                `http://localhost:8080/uploads/resume/${employee.resumeFile}`
                            }
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


            {/* MANAGE FILES */}

            <h3 className="section-title">
                Manage Files
            </h3>


            {/* PROFILE IMAGE */}

            <div className="upload-group">

                <label>
                    📷 Profile Image
                </label>

                <div className="upload-row">

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(event) =>
                            setProfileImage(
                                event.target.files[0]
                            )
                        }
                    />

                    <button
                        className="upload-btn"
                        onClick={
                            uploadProfileImage
                        }
                    >
                        Upload
                    </button>

                </div>

            </div>


            {/* RESUME */}

            <div className="upload-group">

                <label>
                    📄 Resume
                </label>

                <div className="upload-row">

                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(event) =>
                            setResumeFile(
                                event.target.files[0]
                            )
                        }
                    />

                    <button
                        className="upload-btn"
                        onClick={
                            uploadResume
                        }
                    >
                        Upload
                    </button>

                </div>

            </div>


            <hr />


            {/* ACTION BUTTONS */}

            <div className="action-buttons">

                {/* EDIT */}

                <button
                    className="edit-btn"
                    onClick={() =>
                        navigate(
                            `/employees/${employee.id}/edit`
                        )
                    }
                >
                    Edit Employee
                </button>


                {/* DELETE */}

               <button
                    className="delete-btn"
                    onClick={deleteEmployee}
                    disabled={deleting}
                >
                    {deleting
                        ? "Deleting..."
                        : "Delete Employee"
                    }
                </button>


                {/* BACK */}

                <button
                    className="back-btn"
                    onClick={() =>
                        navigate("/employees")
                    }
                >
                    Back
                </button>

            </div>

        </div>

    );

}

export default EmployeeDetails;