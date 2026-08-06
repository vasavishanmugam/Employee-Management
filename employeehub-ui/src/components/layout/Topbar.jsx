import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import "./Topbar.css";

function Topbar() {
    return (
        <header className="topbar">
            <div>
                <h2>Employee Dashboard</h2>
            </div>

            <div className="topbar-right">
                <NotificationsIcon className="topbar-icon" />
                <AccountCircleIcon className="topbar-profile" />
            </div>

        </header>
    )
}

export default Topbar;