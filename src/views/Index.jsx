import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-5 mb-4 bg-light rounded-3 shadow-sm">
      <div className="container-fluid  py-5">
        <h1 className="display-5 fw-bold">Fetch React </h1>
        <p className="col-md-12 fs-4">
          Fetch backend express pake react semalem jadi, Omke Gams
        </p>
        <hr />
        <Link to="/register" className="btn btn-primary btn-lg me-3">
          Registrasi
        </Link>
        <Link to="/login" className="btn btn-secondary btn-lg">
          Login
        </Link>
      </div>
    </div>
  );
}
