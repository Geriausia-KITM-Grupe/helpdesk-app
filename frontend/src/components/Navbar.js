import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand navbar-light bg-light mb-4">
      <div className="container">
        <span
          className="navbar-brand"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Helpdesk
        </span>
        <button className="btn btn-link" onClick={() => navigate("/")}>
          Pradžia
        </button>
        <div>
          {user ? (
            <>
              <span className="me-2">
                Prisijungęs kaip: <b>{user.username}</b> ({user.role})
              </span>
              {user.role === "admin" && (
                <>
                  <button
                    className="btn btn-link"
                    onClick={() => navigate("/dashboard")}
                  >
                    Į kliento puslapį
                  </button>
                  <button
                    className="btn btn-link"
                    onClick={() => navigate("/admin")}
                  >
                    Į admin panelę
                  </button>
                </>
              )}
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={onLogout}
              >
                Atsijungti
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-link"
                onClick={() => navigate("/login")}
              >
                Prisijungti
              </button>
              <button
                className="btn btn-link"
                onClick={() => navigate("/register")}
              >
                Registruotis
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
