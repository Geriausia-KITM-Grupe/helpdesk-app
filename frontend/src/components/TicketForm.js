import React, { useState, useEffect } from "react";

const TICKET_CATEGORIES = [
  "Paskyra",
  "Techninė pagalba",
  "Apmokėjimas",
  "Nustatymai",
  "Kita",
];

function TicketForm({ onTicketCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(TICKET_CATEGORIES[0]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setIsSubmitting(true);
      const res = await fetch("http://localhost:5001/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, category }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Užklausa sėkmingai užregistruota!");
        setTitle("");
        setDescription("");
        setCategory(TICKET_CATEGORIES[0]);
        onTicketCreated && onTicketCreated();
      } else {
        setError(data.msg || "Klaida registruojant užklausą");
      }
    } catch {
      setError("Serverio klaida");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h4 className="mb-3">Nauja užklausa</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Antraštė"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <textarea
          className="form-control"
          placeholder="Aprašymas"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Kategorija</label>
        <select
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {TICKET_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <button
        className="btn btn-primary w-100"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Registruojama..." : "Registruoti"}
      </button>
    </form>
  );
}

export default TicketForm;
