import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Cookies from "js-cookie";

export default function SidebarMenu() {
  const navigate = useNavigate();

  const { setIsAuthenticated } = useContext(AuthContext);

  const Logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setIsAuthenticated(false);
    navigate("/login", { replace: true });
  };
  return (
    <div className="card border-0 rounded shadow-sm">
      <div className="card-header">Menu Utama</div>
      <div className="card-body">
        <div className="list-group">
          <Link
            to="/admin/dashboard"
            className="list-group-item list-goup-item-action"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/users"
            className="list-group-item list-group-item-action"
          >
            Users
          </Link>
          <a
            onClick={Logout}
            className="list-group-item list-group-item-action"
            style={{ cursor: "pointer" }}
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  );
}
