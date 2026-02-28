import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function MainLayout({ children }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">

          {/* Logo */}
          <Link className="navbar-brand fw-bold" to="/">
            EventFlow
          </Link>

          {/* Botón hamburguesa */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Contenido colapsable */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-lg-center">

              {!user && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Registro
                    </Link>
                  </li>
                </>
              )}

              {user && user.role === "user" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
              )}

              {user && user.role === "admin" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    Admin
                  </Link>
                </li>
              )}

              {user && (
                <li className="nav-item mt-2 mt-lg-0">
                  <button
                    className="btn btn-outline-light btn-sm ms-lg-3 w-100 w-lg-auto"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              )}

            </ul>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="container py-4">
        {children}
      </main>
    </>
  );
}