import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 shadow-sm">
      <div className="container">
        <span
          className="navbar-brand"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Helpdesk
        </span>

        {/* Mobile menu toggle */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <div className="navbar-nav me-auto">
            <button
              className="btn btn-primary btn-sm me-2 mb-2 mb-lg-0 d-flex align-items-center"
              style={{ borderRadius: "2rem", fontWeight: 500 }}
              onClick={() => {
                navigate("/");
                setIsOpen(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                className="bi bi-house-door me-1"
                viewBox="0 0 16 16"
              >
                <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 2 7.5V14a1 1 0 0 0 1 1h3.5a.5.5 0 0 0 .5-.5V11a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.5a.5.5 0 0 0 .5.5H13a1 1 0 0 0 1-1V7.5a.5.5 0 0 0-.146-.354l-6-6zM13 14H9.5V11a1.5 1.5 0 0 0-3 0v3H3V7.707l5-5 5 5V14z" />
              </svg>
              Pradžia
            </button>
          </div>

          <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center ms-lg-auto">
            {user ? (
              <>
                <span className="me-lg-3 mb-2 mb-lg-0 text-muted small">
                  Prisijungęs kaip: <b>{user.username}</b> ({user.role})
                </span>
                {user.role !== "admin" && (
                  <button
                    className="btn btn-outline-primary btn-sm me-lg-2 mb-2 mb-lg-0 d-flex align-items-center"
                    style={{ borderRadius: "2rem" }}
                    onClick={() => {
                      navigate("/dashboard");
                      setIsOpen(false);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      className="bi bi-card-list me-1"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 4.5a.5.5 0 0 1-.5.5H5.707l.647.646a.5.5 0 0 1-.708.708l-1.5-1.5a.5.5 0 0 1 0-.708l1.5-1.5a.5.5 0 1 1 .708.708L5.707 4H13.5a.5.5 0 0 1 .5.5zm0 4a.5.5 0 0 1-.5.5H5.707l.647.646a.5.5 0 0 1-.708.708l-1.5-1.5a.5.5 0 0 1 0-.708l1.5-1.5a.5.5 0 1 1 .708.708L5.707 8H13.5a.5.5 0 0 1 .5.5zm0 4a.5.5 0 0 1-.5.5H5.707l.647.646a.5.5 0 0 1-.708.708l-1.5-1.5a.5.5 0 0 1 0-.708l1.5-1.5a.5.5 0 1 1 .708.708L5.707 12H13.5a.5.5 0 0 1 .5.5z" />
                    </svg>
                    Mano užklausos
                  </button>
                )}
                {user.role === "admin" && (
                  <div className="d-flex flex-column flex-lg-row mb-2 mb-lg-0">
                    <button
                      className="btn btn-outline-info btn-sm me-lg-2 mb-2 mb-lg-0 d-flex align-items-center"
                      style={{ borderRadius: "2rem" }}
                      onClick={() => {
                        navigate("/dashboard");
                        setIsOpen(false);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="currentColor"
                        className="bi bi-person-lines-fill me-1"
                        viewBox="0 0 16 16"
                      >
                        <path d="M1 14s-1 0-1-1 1-4 7-4 7 3 7 4-1 1-1 1H1Zm7-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm4.5-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 0 1h-2Zm-2-2a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4Zm2 4a.5.5 0 0 1 0-1h2a.5.5 0 0 1 0 1h-2Z" />
                      </svg>
                      Kliento vaizdas
                    </button>
                    <button
                      className="btn btn-outline-warning btn-sm me-lg-2 mb-2 mb-lg-0 d-flex align-items-center"
                      style={{ borderRadius: "2rem" }}
                      onClick={() => {
                        navigate("/admin");
                        setIsOpen(false);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="currentColor"
                        className="bi bi-shield-lock me-1"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 8a1.5 1.5 0 1 1 3 0v1a1.5 1.5 0 1 1-3 0V8Zm1.5-6.5a.5.5 0 0 1 .5.5v1.528c.162.02.324.05.482.09C10.5 4.5 13 5.5 13 8.5c0 2.5-2.5 4.5-5 4.5s-5-2-5-4.5c0-3 2.5-4 5-4.382V2a.5.5 0 0 1 .5-.5Z" />
                      </svg>
                      Admin panelė
                    </button>
                  </div>
                )}
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => {
                    onLogout();
                    setIsOpen(false);
                  }}
                >
                  Atsijungti
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-outline-primary btn-sm me-lg-2 mb-2 mb-lg-0 d-flex align-items-center"
                  style={{ borderRadius: "2rem" }}
                  onClick={() => {
                    navigate("/login");
                    setIsOpen(false);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-box-arrow-in-right me-1"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 3a.5.5 0 0 1 .5.5v2.5h5.793l-1.147-1.146a.5.5 0 1 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L12.293 9H6.5v2.5a.5.5 0 0 1-1 0v-8A.5.5 0 0 1 6 3z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M13.5 8a.5.5 0 0 1-.5.5H2.707l1.147 1.146a.5.5 0 0 1-.708.708l-2-2a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L2.707 7.5H13a.5.5 0 0 1 .5.5z"
                    />
                  </svg>
                  Prisijungti
                </button>
                <button
                  className="btn btn-outline-success btn-sm d-flex align-items-center"
                  style={{ borderRadius: "2rem" }}
                  onClick={() => {
                    navigate("/register");
                    setIsOpen(false);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-person-plus me-1"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm4-3a.5.5 0 0 1 .5.5v1.5H14a.5.5 0 0 1 0 1h-1.5V10a.5.5 0 0 1-1 0V6H10a.5.5 0 0 1 0-1h1.5V3.5A.5.5 0 0 1 12 3z" />
                    <path d="M2 13s-1 0-1-1 1-4 7-4 7 3 7 4-1 1-1 1H2zm7-4.5c-3.5 0-6 1.5-6 3.5 0 .5.5.5 1 .5h10c.5 0 1 0 1-.5 0-2-2.5-3.5-6-3.5z" />
                  </svg>
                  Registruotis
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
