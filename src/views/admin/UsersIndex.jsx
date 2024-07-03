import { Link } from "react-router-dom";
import SidebarMenu from "../../components/SidebarMenu";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Api from "../../services/api";

export default function UsersIndex() {
  const [users, setUsers] = useState([]);

  const fetchDataUsers = async () => {
    const token = Cookies.get("token");
    console.log("Token retrieved from cookies:", token);

    if (token) {
      Api.defaults.headers.common["Authorization"] = token;

      try {
        const response = await Api.get("/api/admin/users");
        setUsers(response.data.data);
      } catch (e) {
        console.error("error getting users", e);
      }
    } else {
      console.error("token salah");
    }
  };

  useEffect(() => {
    fetchDataUsers();
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-3">
          <SidebarMenu />
        </div>
        <div className="col-md-9">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              <span>User</span>
              <Link
                to="/admin/users/create"
                className="btn btn-sm btn-success rounded shadow-sm border-0"
              >
                Tambah User
              </Link>
            </div>
            <div className="card-body">
              <table className="table table-bordered">
                <thead className="bg-dark text-white">
                  <tr>
                    <th scope="col">Full Name</th>
                    <th scope="col">Email</th>
                    <th scope="col" style={{ width: "17%" }}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <tr key={index}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td className="text-center">
                          <Link
                            to={`/admin/users/edit/${user.id}`}
                            className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2"
                          >
                            Edit
                          </Link>
                          <button className="btn btn-sm btn-danger rounded-sm shadow border-0">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        <div className="alert alert-danger mb-0">
                          Data belum tersedia, Silahkan menambahkan terlebih
                          dahulu
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
