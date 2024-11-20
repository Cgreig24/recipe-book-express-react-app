import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar bg-white text-black p-4">
      <ul>
        <li>
          <Link
            to="/dashboard"
            className={location.pathname === "/dashboard" ? "active" : ""}
          >
            Cohorts
          </Link>
        </li>
        <li>
          <Link
            to="/user"
            className={location.pathname === "/user" ? "active" : ""}
          >
            User Profile
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
