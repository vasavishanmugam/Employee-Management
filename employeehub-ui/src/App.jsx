import { Routes, Route } from "react-router-dom";

import EmployeeList from "./pages/EmployeeList";
import EmployeeDetails from "./pages/EmployeeDetails";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import UploadFiles from "./pages/UploadFiles";
import Settings from "./pages/Settings";
import UploadEmployees from "./pages/UploadEmployees";

function App() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Dashboard />}  />
        {/* <Route path="/employees/:id" element={<EmployeeDetails/>} />
        <Route path="/employees" element={<EmployeeList />} /> */}
                <Route path="/employees" element={<Employees />} />
                <Route path="/add" element={<AddEmployee />} />
                <Route path="/upload" element={<UploadEmployees />} />
                <Route path="/settings" element={<Settings />} />

      </Routes>
    </DashboardLayout>
  )
}

export default App;