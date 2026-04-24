import React, { useState, useEffect } from "react";

function RegisterForm({ onRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Auto-clear notifications after 5 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:5001/api/users/register", {
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
    <form
      onSubmit={handleSubmit}
      className="p-4 card shadow-sm mx-auto"
      style={{ maxWidth: 400 }}
    >
      <h2 className="mb-3 text-center">Registracija</h2>
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
      <button className="btn btn-success w-100" type="submit">
        Registruotis
      </button>
    </form>
  );
}

export default RegisterForm;
