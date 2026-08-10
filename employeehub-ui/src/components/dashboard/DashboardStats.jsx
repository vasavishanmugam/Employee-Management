import {
    Grid,
    Card,
    CardContent,
    Typography,
    Box
} from "@mui/material";

import GroupsIcon from "@mui/icons-material/Groups";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

function DashboardStats({ dashboard }) {

    const stats = [
        {
            title: "Total Employees",
            value: dashboard?.totalEmployees ?? 0,
            icon: <GroupsIcon />,
            color: "#1976d2"
        },
        {
            title: "Highest Salary",
            value: dashboard?.highestSalary != null
                ? `₹${dashboard.highestSalary.toLocaleString("en-IN")}`
                : "₹0",
            icon: <TrendingUpIcon />,
            color: "#2e7d32"
        },
        {
            title: "Lowest Salary",
            value: dashboard?.lowestSalary != null
                ? `₹${dashboard.lowestSalary.toLocaleString("en-IN")}`
                : "₹0",
            icon: <TrendingDownIcon />,
            color: "#d32f2f"
        },
        {
            title: "Average Salary",
            value: dashboard?.averageSalary != null
                ? `₹${Math.round(dashboard.averageSalary).toLocaleString("en-IN")}`
                : "₹0",
            icon: <AccountBalanceWalletIcon />,
            color: "#7b1fa2"
        }
    ];

    return (
        <Grid
            container
            spacing={3}
            sx={{ mb: 4 }}
        >
            {stats.map((stat) => (
                <Grid
                    key={stat.title}
                    size={{ xs: 12, sm: 6, md: 3 }}
                >
                    <Card
                        elevation={3}
                        sx={{
                            height: "100%",
                            borderRadius: 3,
                            transition: "0.2s",

                            "&:hover": {
                                transform: "translateY(-4px)",
                                boxShadow: 6
                            }
                        }}
                    >
                        <CardContent>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                            >
                                <Box>
                                    <Typography
                                        variant="subtitle2"
                                        color="text.secondary"
                                    >
                                        {stat.title}
                                    </Typography>

                                    <Typography
                                        variant="h4"
                                        sx={{
                                            color: stat.color,
                                            fontWeight: "bold",
                                            mt: 1
                                        }}
                                    >
                                        {stat.value}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        width: 52,
                                        height: 52,
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: `${stat.color}15`,
                                        color: stat.color
                                    }}
                                >
                                    {stat.icon}
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default DashboardStats;