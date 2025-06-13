import React, { useState } from "react";

function RegisterForm({ onRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Registracija sėkminga! Galite prisijungti.");
        setTimeout(() => onRegister && onRegister(), 1200);
      } else {
        setError(data.msg || "Registracijos klaida");
      }
    } catch {
      setError("Serverio klaida");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registracija</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Vartotojo vardas"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Slaptažodis"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-success" type="submit">
        Registruotis
      </button>
    </form>
  );
}

export default RegisterForm;
