import PageHeader from "../components/common/PageHeader";

import {
    Card,
    CardContent,
    Grid,
    TextField,
    Button,
    Avatar
} from "@mui/material";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../services/api";


function EditEmployee() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        salary: ""
    });

    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);

    const [selectedImage, setSelectedImage] = useState(null);

    const [previewImage, setPreviewImage] = useState("");

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });


    // =========================
    // LOAD EMPLOYEE
    // =========================

    useEffect(() => {
        fetchEmployee();
    }, [id]);


    const fetchEmployee = async () => {

        try {

            const response = await api.get(`/employees/${id}`);

            console.log("Employee:", response.data);

            const data = response.data.data;

            setEmployee({
                name: data.name || "",
                email: data.email || "",
                salary: data.salary || ""
            });


            // Existing profile image

            if (data.profileImage) {

                setPreviewImage(
                    `http://localhost:8080/uploads/profile/${data.profileImage}`
                );

            }

        }
        catch (error) {

            console.error("Failed to load employee:", error);

            setSnackbar({
                open: true,
                message: "Failed to load employee",
                severity: "error"
            });

        }

    };


    // =========================
    // HANDLE TEXT CHANGE
    // =========================

    const handleChange = (event) => {

        const { name, value } = event.target;

        setEmployee((prev) => ({
            ...prev,
            [name]: value
        }));

    };


    // =========================
    // HANDLE IMAGE
    // =========================

    const handleImageChange = (event) => {

        const file = event.target.files[0];

        if (!file) {
            return;
        }

        setSelectedImage(file);

        setPreviewImage(
            URL.createObjectURL(file)
        );

    };


    // =========================
    // VALIDATION
    // =========================

    const validateForm = () => {

        let newErrors = {};


        if (!employee.name.trim()) {

            newErrors.name =
                "Employee name is required";

        }


        if (!employee.email.trim()) {

            newErrors.email =
                "Email is required";

        }
        else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                .test(employee.email)
        ) {

            newErrors.email =
                "Invalid email address";

        }


        if (!employee.salary) {

            newErrors.salary =
                "Salary is required";

        }
        else if (
            Number(employee.salary) <= 0
        ) {

            newErrors.salary =
                "Salary must be greater than 0";

        }


        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };


    // =========================
    // UPDATE EMPLOYEE
    // =========================

    const handleUpdate = async () => {

        if (!validateForm()) {
            return;
        }

        setLoading(true);


        try {

            /*
             * Create multipart form data.
             */

            const formData = new FormData();


            /*
             * Employee JSON
             */

            formData.append(
                "employee",
                new Blob(
                    [
                        JSON.stringify(employee)
                    ],
                    {
                        type: "application/json"
                    }
                )
            );


            /*
             * New profile image
             * Only send if user selected one.
             */

            if (selectedImage) {

                formData.append(
                    "profileImage",
                    selectedImage
                );

            }


            /*
             * PUT request
             */

            const response = await api.put(
                `/employees/${id}`,
                formData
            );


            console.log(
                "Updated employee:",
                response.data
            );


            setSnackbar({
                open: true,
                message: "Employee updated successfully!",
                severity: "success"
            });


            /*
             * Go back to employee details
             */

            setTimeout(() => {

                navigate(`/employees/${id}`);

            }, 1500);

        }
        catch (error) {

            console.error(
                "Failed to update employee:",
                error
            );


            /*
             * If backend returns validation error,
             * show it in console.
             */

            if (error.response) {

                console.error(
                    "Status:",
                    error.response.status
                );

                console.error(
                    "Response:",
                    error.response.data
                );

            }


            setSnackbar({
                open: true,
                message: "Failed to update employee",
                severity: "error"
            });

        }
        finally {

            setLoading(false);

        }

    };


    // =========================
    // CANCEL
    // =========================

    const handleCancel = () => {

        navigate(`/employees/${id}`);

    };


    // =========================
    // UI
    // =========================

    return (

        <>

            <PageHeader
                title="Edit Employee"
                subtitle="Update employee information."
            />


            <Card>

                <CardContent>

                    <Grid
                        container
                        spacing={3}
                    >


                        {/* PROFILE IMAGE */}

                        <Grid size={{ xs: 12 }}>

                            <Avatar
                                src={previewImage}
                                sx={{
                                    width: 120,
                                    height: 120,
                                    mb: 2
                                }}
                            />


                            <Button
                                variant="outlined"
                                component="label"
                            >

                                Choose Profile Image

                                <input
                                    hidden
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />

                            </Button>

                        </Grid>


                        {/* NAME */}

                        <Grid
                            size={{
                                xs: 12,
                                md: 6
                            }}
                        >

                            <TextField
                                fullWidth
                                label="Employee Name"
                                name="name"
                                value={employee.name}
                                onChange={handleChange}
                                error={!!errors.name}
                                helperText={errors.name}
                            />

                        </Grid>


                        {/* EMAIL */}

                        <Grid
                            size={{
                                xs: 12,
                                md: 6
                            }}
                        >

                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={employee.email}
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email}
                            />

                        </Grid>


                        {/* SALARY */}

                        <Grid
                            size={{
                                xs: 12,
                                md: 6
                            }}
                        >

                            <TextField
                                fullWidth
                                label="Salary"
                                name="salary"
                                value={employee.salary}
                                onChange={handleChange}
                                error={!!errors.salary}
                                helperText={errors.salary}
                            />

                        </Grid>


                        {/* BUTTONS */}

                        <Grid
                            size={{ xs: 12 }}
                        >

                            <Button
                                variant="contained"
                                onClick={handleUpdate}
                                disabled={loading}
                                sx={{ mr: 2 }}
                            >

                                {loading
                                    ? "Updating..."
                                    : "Update Employee"}

                            </Button>


                            <Button
                                variant="outlined"
                                onClick={handleCancel}
                                disabled={loading}
                            >

                                Cancel

                            </Button>

                        </Grid>


                    </Grid>

                </CardContent>

            </Card>


            {/* SNACKBAR */}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() =>
                    setSnackbar({
                        ...snackbar,
                        open: false
                    })
                }
            >

                <Alert
                    severity={snackbar.severity}
                    onClose={() =>
                        setSnackbar({
                            ...snackbar,
                            open: false
                        })
                    }
                    variant="filled"
                >

                    {snackbar.message}

                </Alert>

            </Snackbar>

        </>

    );

}


export default EditEmployee;