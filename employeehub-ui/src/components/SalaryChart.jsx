import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Typography, Paper } from "@mui/material";

function SalaryChart({employees, loading}) {
    if (loading)
    {
        return (
            <Paper sx={{ p: 3, mt: 3 }}>
                <Typography align="center">
                    Loading salary chart...
                </Typography>
            </Paper>
        )
    }

    if (! employees || employees.length == 0) {
    return (
        <Paper sx={{ p: 3, mt: 3 }}>
            <Typography align="center">
                No employee data available.
            </Typography>
        </Paper>
    );
    }
    
    return (
        <div
            style={{
                background: "#ffffff",
                padding: "24px",
                borderRadius: "12px",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                marginBottom: "30px"
            }}>
            <Typography
                variant="h5"
                sx={{ mb: 3, fontWeight: "bold", color: "#1976d2" }}
                >
                Salary Distribution</Typography>

            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={employees}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }}/>
                    <YAxis tickFormatter={(value => `₹${value / 1000}k`)}/>
                    <Tooltip formatter={(value) => [
                        `₹${Number(value).toLocaleString("en-IN")}`,
                        "Salary",
                    ]}/>
                    <Bar 
                        dataKey="salary"
                        fill="#1976d2"
                        radius={[8,8,0,0]}
                        animationDuration={1000}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default SalaryChart;