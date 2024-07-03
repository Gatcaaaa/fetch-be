import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../services/api";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validation, setValidation] = useState([]);

  const register = async (event) => {
    event.preventDefault();

    await Api.post("/api/register", {
      name: name,
      email: email,
      password: password,
    })
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        setValidation(error.response.data);
      });
  };

  return (
    <div className="row justify-content-center">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-body">
              <h4>Register</h4>
              <hr />
              {validation.errors && (
                <div className="alert alert-danger mt-2 pb-0">
                  {validation.errors.map((error, index) => (
                    <p key={index}>
                      {error.path} : {error.msg}
                    </p>
                  ))}
                </div>
              )}
              <form onSubmit={register}>
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <div className="form-group">
                      <label className="mb-1 fw-bold">Full Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                        placeholder="Full Name"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <label className="mb-1 fw-bold">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        placeholder="Emailnya banj"
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <label className="mb-1 fw-bold">Password</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        placeholder="Password yang kuat"
                      />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Registrasi
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
