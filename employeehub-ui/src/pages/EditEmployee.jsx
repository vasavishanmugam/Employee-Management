import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../services/api";
import "./EditEmployee.css";

function EditEmployee() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [employee, setEmployee] = useState(null);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        salary: ""
    });

    useEffect(() => {

        fetchEmployee();

    }, [id]);

    async function fetchEmployee() {

        try {

            setLoading(true);

            setError("");

            const response =
                await api.get(`/employees/${id}`);

            const data =
                response.data?.data ?? response.data;

            setEmployee(data);

            setFormData({
                name: data.name || "",
                email: data.email || "",
                salary: data.salary ?? ""
            });

        } catch (error) {

            console.error(
                "Failed to fetch employee:",
                error
            );

            setError(
                "Employee not found."
            );

        } finally {

            setLoading(false);
        }
    }

    function handleChange(event) {

        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    }

    async function handleSubmit(event) {

        event.preventDefault();

        try {

            setSaving(true);

            setError("");

            await api.put(
                `/employees/${id}`,
                {
                    name: formData.name,
                    email: formData.email,
                    salary: Number(formData.salary)
                }
            );

            alert(
                "Employee updated successfully."
            );

            navigate(`/employees/${id}`);

        } catch (error) {

            console.error(
                "Update employee failed:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to update employee."
            );

        } finally {

            setSaving(false);
        }
    }

    async function handleDelete() {

        const confirmed = window.confirm(
            "Are you sure you want to delete this employee?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await api.delete(
                `/employees/${id}`
            );

            alert(
                "Employee deleted successfully."
            );

            navigate("/employees");

        } catch (error) {

            console.error(
                "Delete employee failed:",
                error
            );

            alert(
                "Failed to delete employee."
            );
        }
    }

    if (loading) {

        return (
            <div className="edit-page-message">
                Loading employee...
            </div>
        );
    }

    if (error || !employee) {

        return (
            <div className="edit-page-message error">

                <h2>
                    Employee not found
                </h2>

                <p>
                    Employee ID {id} does not exist.
                </p>

                <button
                    onClick={() =>
                        navigate("/employees")
                    }
                >
                    Back to Employees
                </button>

            </div>
        );
    }

    return (
        <div className="edit-employee-page">

            <div className="edit-header">

                <div>
                    <h1>
                        Edit Employee
                    </h1>

                    <p>
                        Update employee information.
                    </p>
                </div>

                <button
                    className="back-list-btn"
                    onClick={() =>
                        navigate("/employees")
                    }
                >
                    ← Employees
                </button>

            </div>

            <div className="edit-card">

                <div className="edit-profile">

                    <img
                        src={
                            employee.profileImage
                                ? `http://localhost:8080/uploads/profile/${employee.profileImage}`
                                : "/images/default-avatar.png"
                        }
                        alt={employee.name}
                    />

                    <div>
                        <h3>
                            {employee.name}
                        </h3>

                        <p>
                            Employee ID: {employee.id}
                        </p>
                    </div>

                </div>

                <form
                    className="edit-form"
                    onSubmit={handleSubmit}
                >

                    {error && (
                        <div className="form-error">
                            {error}
                        </div>
                    )}

                    <div className="form-group">

                        <label>
                            Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Salary
                        </label>

                        <input
                            type="number"
                            name="salary"
                            value={formData.salary}
                            onChange={handleChange}
                            min="0"
                            required
                        />

                    </div>

                    <div className="edit-actions">

                        <button
                            type="submit"
                            className="save-btn"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : "Save Changes"}
                        </button>

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() =>
                                navigate(
                                    `/employees/${id}`
                                )
                            }
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            className="delete-employee-btn"
                            onClick={handleDelete}
                        >
                            Delete Employee
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default EditEmployee;