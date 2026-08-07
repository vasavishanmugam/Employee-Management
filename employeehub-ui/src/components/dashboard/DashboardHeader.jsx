import { Typography } from "@mui/material";

function DashboardHeader() {
    return (
        <>
            <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ mb: 1}}
            >
                Dashboard
            </Typography>
            <Typography
            color="text.secondary"
            sx={{ mb: 3}}
            >
                Welcome back! Here's an overview of your employees.
            </Typography>
        </>
    )
}

export default DashboardHeader;