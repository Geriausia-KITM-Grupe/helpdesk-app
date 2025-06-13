import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";
import AdminPanel from "./components/AdminPanel";
import FAQSearch from "./components/FAQSearch";
import Navbar from "./components/Navbar";

function Home() {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "60vh" }}
    >
      <div
        className="card shadow-sm p-4 mb-4"
        style={{ maxWidth: 500, width: "100%" }}
      >
        <h1 className="mb-3 text-center">Helpdesk sistema</h1>
        <p className="lead text-center">
          Sveiki atvykę! Čia galite registruoti problemas, užduoti klausimus ir
          gauti pagalbą.
        </p>
      </div>
      <div className="w-100" style={{ maxWidth: 700 }}>
        <FAQSearch />
      </div>
    </div>
  );
}

function Dashboard() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="row g-4">
      <div className="col-lg-6">
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <TicketForm onTicketCreated={() => setRefresh((r) => !r)} />
          </div>
        </div>
        <div className="card shadow-sm">
          <div className="card-body">
            <TicketList refresh={refresh} />
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="card shadow-sm h-100">
          <div className="card-body">
            <FAQSearch />
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    // Bandome atkurti vartotoją iš localStorage
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData && !user) {
      setUser(JSON.parse(userData));
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate
                  to={user.role === "admin" ? "/admin" : "/dashboard"}
                />
              ) : showRegister ? (
                <Navigate to="/register" />
              ) : (
                <LoginForm onLogin={setUser} />
              )
            }
          />
          <Route
            path="/register"
            element={
              user ? (
                <Navigate
                  to={user.role === "admin" ? "/admin" : "/dashboard"}
                />
              ) : (
                <RegisterForm onRegister={() => setShowRegister(false)} />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              user && user.role === "client" ? (
                <Dashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin"
            element={
              user && user.role === "admin" ? (
                <AdminPanel />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
