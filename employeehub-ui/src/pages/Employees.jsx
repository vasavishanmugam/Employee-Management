import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../services/api";
import PageHeader from "../components/common/PageHeader";

import RecentEmployees from "../components/dashboard/RecentEmployees";

function Employees() {
    const [employees, setEmployees]  = useState([]);

useEffect(() => {
    api
        .get("/employees/filter?page=0&size=5")
        .then((response) => {
            console.log(response.data.data);

            setEmployees(response.data.data.content);
        })
        .catch((error) => {
            console.error(error);
        });
}, []);
    return (
        <>
            <PageHeader
    title="Employees"
    subtitle="Manage all employees in your organization."
/>

            <RecentEmployees employees={employees} 
            title="All Employees"
    showButton={false}/>
        </>
    );
}

export default Employees;