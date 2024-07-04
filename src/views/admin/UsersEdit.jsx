import { useNavigate, useParams } from "react-router-dom";
import SidebarMenu from "../../components/SidebarMenu";
import { useEffect, useState } from "react";
import Api from "../../services/api";
import Cookies from "js-cookie";

export default function UsersEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState([]);
  const token = Cookies.get("token");

  const fetchDetailUser = async () => {
    await Api.get(`/api/admin/users/${id}`).then((response) => {
      setName(response.data.data.name);
      setEmail(response.data.data.email);
    });
  };

  useEffect(() => {
    fetchDetailUser();
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();

    Api.defaults.headers.common["Authorization"] = token;
    await Api.put(`/api/admin/users/${id}`, {
      name: name,
      email: email,
      password: password,
    })
      .then(() => {
        navigate("/admin/users");
      })
      .catch((err) => {
        setValidation(err.response.data);
      });
  };
  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-3">
          <SidebarMenu />
        </div>
        <div className="col-md-9">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-header">Edit User</div>
            <div className="card-body">
              {validation.errors && (
                <div className="alert alert-danger mt-2 pb-0">
                  {validation.errors.map((error, index) => (
                    <p key={index}>
                      {error.path} : {error.msg}
                    </p>
                  ))}
                </div>
              )}
              <form onSubmit={updateUser}>
                <div className="form-group mb-3">
                  <label className="mb-1 fw-bold">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="Full Name"
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="mb-1 fw-bold">Email</label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    placeholder="Email"
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="mb-1 fw-bold">Password</label>
                  <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="password"
                  />
                </div>

                <button type="submit" className="btn btn-sm btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
