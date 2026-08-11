import { NavLink } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";

import Tooltip from "@mui/material/Tooltip";

import "./Sidebar.css";

function Sidebar({ collapsed, setCollapsed }) {
    return (
        <div
            className={`sidebar ${
                collapsed ? "collapsed" : ""
            }`}
        >
            {/* HEADER */}
            <div className="sidebar-header">

                <MenuIcon
                    className="collapse-btn"
                    onClick={() => setCollapsed(!collapsed)}
                />

                {!collapsed && (
                    <div className="logo">
                        <h2>
                            Employee
                            <br />
                            Management
                        </h2>
                    </div>
                )}

            </div>

            {/* DIVIDER */}
            <div className="sidebar-divider"></div>

            {/* NAVIGATION */}
            <nav>

                {/* Dashboard */}
                <Tooltip
                    title={collapsed ? "Dashboard" : ""}
                    placement="right"
                    arrow
                >
                    <NavLink
                        to="/"
                        className="menu-item"
                    >
                        <DashboardIcon />

                        {!collapsed && (
                            <span>Dashboard</span>
                        )}
                    </NavLink>
                </Tooltip>

                {/* Employees */}
                <Tooltip
                    title={collapsed ? "Employees" : ""}
                    placement="right"
                    arrow
                >
                    <NavLink
                        to="/employees"
                        className="menu-item"
                    >
                        <PeopleIcon />

                        {!collapsed && (
                            <span>Employees</span>
                        )}
                    </NavLink>
                </Tooltip>

                {/* Add Employee */}
                <Tooltip
                    title={collapsed ? "Add Employee" : ""}
                    placement="right"
                    arrow
                >
                    <NavLink
                        to="/add"
                        className="menu-item"
                    >
                        <PersonAddIcon />

                        {!collapsed && (
                            <span>Add Employee</span>
                        )}
                    </NavLink>
                </Tooltip>

                {/* Upload File */}
                <Tooltip
                    title={collapsed ? "Upload File" : ""}
                    placement="right"
                    arrow
                >
                    <NavLink
                        to="/upload"
                        className="menu-item"
                    >
                        <UploadFileIcon />

                        {!collapsed && (
                            <span>Upload File</span>
                        )}
                    </NavLink>
                </Tooltip>

                {/* Settings */}
                <Tooltip
                    title={collapsed ? "Settings" : ""}
                    placement="right"
                    arrow
                >
                    <NavLink
                        to="/settings"
                        className="menu-item"
                    >
                        <SettingsIcon />

                        {!collapsed && (
                            <span>Settings</span>
                        )}
                    </NavLink>
                </Tooltip>

            </nav>

        </div>
    );
}

export default Sidebar;