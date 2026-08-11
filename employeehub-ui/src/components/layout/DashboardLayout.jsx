import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./DashboardLayout.css";
import { useState } from "react"; 

function DashboardLayout({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className={`dashboard-layout ${
            collapsed ? "collapsed" : ""
        }`}>
            <Sidebar 
            collapsed={collapsed}
            setCollapsed={setCollapsed}/>
            <div className="dashboard-content">
                <Topbar />
                <main className="page-content">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout;