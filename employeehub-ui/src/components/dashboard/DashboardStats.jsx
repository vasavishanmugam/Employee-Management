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

    return (
        <Grid container spacing={3} sx={{ mb:4}}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={3}>
            <CardContent>
              <Box
                      sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                >
                  <div>
                    <Typography variant='subtitle2' color='text.secondary'>
                      Total Employees
                    </Typography>

                    <Typography variant='h4'  sx={{
                        color: "#1976d2",
                        fontWeight: "bold"
                    }}>
                      {dashboard.totalEmployees}
                    </Typography>
                  </div>

                  <GroupsIcon
                  sx={{
                    fontSize: 45,
                    color: "#1976d2"
                  }} />
                </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={3}>
            <CardContent>
              <Box   sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <div>
                  <Typography variant='subtitle2' color='text.secondary'>
                    Highest Salary
                  </Typography>

                  <Typography variant='h4'sx={{ 
                                            color: "#2e7d32",
                                            fontWeight: "bold"}}>
                    ₹{dashboard.highestSalary?.toLocaleString("en-IN")}
                  </Typography>
                </div>
                <TrendingUpIcon
                sx={{
                  fontSize:45,
                  color: "#2e7d32"
                }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
            
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={3}>
            <CardContent>
              <Box  sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <div>
                  <Typography variant='subtitle2' color='text.secondary'>
                    Lowest Salary
                  </Typography>

                  <Typography variant='h4' sx={{
                      color: "#d32f2f",
                      fontWeight: "bold"
                  }}>
                    ₹{dashboard.lowestSalary?.toLocaleString("en-IN")}
                  </Typography>
                </div>

                <TrendingDownIcon
                sx={{
                  fontSize: 45,
                  color: "#d32f2f"
                }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={3}>
            <CardContent>
              <Box   sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <div>
                  <Typography variant='subtitle2' color='text.secondary'>
                    Average Salary
                  </Typography>

                  <Typography variant='h4' sx={{
                        color: "#7b1fa2",
                        fontWeight: "bold"
                    }}>
                    ₹{Math.round(dashboard.averageSalary)?.toLocaleString("en-IN")}
                  </Typography>
                </div>
                <AccountBalanceWalletIcon
                  sx={{
                    fontSize: 45,
                    color: "#7b1fa2"
                  }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
}

export default DashboardStats;