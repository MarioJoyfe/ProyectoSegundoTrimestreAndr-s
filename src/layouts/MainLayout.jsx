import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function MainLayout({ children }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            EventFlow
          </Link>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">

              {!user && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Registro</Link>
                  </li>
                </>
              )}

              {user && user.role === "user" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
              )}

              {user && user.role === "admin" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">Admin</Link>
                </li>
              )}

              {user && (
                <li className="nav-item">
                  <button
                    className="btn btn-outline-light btn-sm ms-3"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              )}

            </ul>
          </div>
        </div>
      </nav>

      <main className="container mt-4">
        {children}
      </main>
    </>
  );
}