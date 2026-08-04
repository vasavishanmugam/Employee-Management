import { Routes, Route } from "react-router-dom";

import EmployeeList from "./pages/EmployeeList";
import EmployeeDetails from "./pages/EmployeeDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<EmployeeList/>}  />
      <Route path="/employees/:id" element={<EmployeeDetails/>} />
    </Routes>
  )
}

export default App;