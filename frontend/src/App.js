import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";
import AdminPanel from "./components/AdminPanel";
import FAQSearch from "./components/FAQSearch";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  if (!user) {
    return (
      <div className="container mt-5">
        {showRegister ? (
          <>
            <RegisterForm onRegister={() => setShowRegister(false)} />
            <p>
              Jau turite paskyrą?{" "}
              <button
                className="btn btn-link"
                onClick={() => setShowRegister(false)}
              >
                Prisijungti
              </button>
            </p>
          </>
        ) : (
          <>
            <LoginForm onLogin={setUser} />
            <p>
              Neturite paskyros?{" "}
              <button
                className="btn btn-link"
                onClick={() => setShowRegister(true)}
              >
                Registruotis
              </button>
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Sveiki, {user.username}!</h2>
      <p>Jūsų rolė: {user.role}</p>
      {user.role === "client" && (
        <>
          <TicketForm />
          <TicketList />
        </>
      )}
      {user.role === "admin" && (
        <>
          <AdminPanel />
        </>
      )}
      <FAQSearch />
      <button
        className="btn btn-secondary mt-3"
        onClick={() => {
          setUser(null);
          localStorage.removeItem("token");
        }}
      >
        Atsijungti
      </button>
    </div>
  );
}

export default App;
