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
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <div>
      <h1>Pradinis puslapis</h1>
      <p>Sveiki atvykę į Helpdesk sistemą!</p>
      <FAQSearch />
    </div>
  );
}

function Dashboard() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      <TicketForm onTicketCreated={() => setRefresh((r) => !r)} />
      <TicketList refresh={refresh} />
      <FAQSearch />
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
        {user && (
          <div className="mt-4">
            <button className="btn btn-secondary" onClick={handleLogout}>
              Atsijungti
            </button>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
