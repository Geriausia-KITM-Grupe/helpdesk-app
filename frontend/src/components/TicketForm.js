import React, { useState } from "react";

function TicketForm({ onTicketCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:5000/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Užklausa sėkmingai užregistruota!");
        setTitle("");
        setDescription("");
        onTicketCreated && onTicketCreated();
      } else {
        setError(data.msg || "Klaida registruojant užklausą");
      }
    } catch {
      setError("Serverio klaida");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h4>Nauja užklausa</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <div className="mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Antraštė"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <textarea
          className="form-control"
          placeholder="Aprašymas"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Registruoti
      </button>
    </form>
  );
}

export default TicketForm;
