import React, { useEffect, useState } from "react";

function AdminPanel() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answerText, setAnswerText] = useState({});
  const [statusUpdate, setStatusUpdate] = useState({});
  const [message, setMessage] = useState("");

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/tickets", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      if (res.ok) setTickets(data);
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleStatusChange = async (id, status) => {
    setMessage("");
    try {
      const res = await fetch(
        `http://localhost:5000/api/tickets/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({ status }),
        }
      );
      if (res.ok) {
        setMessage("Statusas atnaujintas!");
        fetchTickets();
      }
    } catch {}
  };

  const handleAnswer = async (ticketId) => {
    setMessage("");
    try {
      const res = await fetch("http://localhost:5000/api/answers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          ticketId,
          answerText: answerText[ticketId],
        }),
      });
      if (res.ok) {
        setMessage("Atsakymas išsiųstas!");
        setAnswerText((prev) => ({ ...prev, [ticketId]: "" }));
      }
    } catch {}
  };

  return (
    <div>
      <h4>Visos užklausos</h4>
      {message && <div className="alert alert-info">{message}</div>}
      {loading ? (
        <div>Kraunama...</div>
      ) : tickets.length === 0 ? (
        <div>Užklausų nėra.</div>
      ) : (
        <ul className="list-group">
          {tickets.map((t) => (
            <li key={t.id} className="list-group-item mb-2">
              <b>{t.title}</b> <br />
              {t.description} <br />
              <span className="badge bg-info text-dark">
                Statusas: {t.status}
              </span>
              <br />
              <span className="badge bg-secondary">
                Klientas: {t.User?.username}
              </span>
              <div className="mt-2">
                <select
                  className="form-select form-select-sm w-auto d-inline"
                  value={statusUpdate[t.id] || t.status}
                  onChange={(e) =>
                    setStatusUpdate((prev) => ({
                      ...prev,
                      [t.id]: e.target.value,
                    }))
                  }
                >
                  <option value="pateiktas">pateiktas</option>
                  <option value="svarstomas">svarstomas</option>
                  <option value="ispręstas">ispręstas</option>
                </select>
                <button
                  className="btn btn-sm btn-outline-primary ms-2"
                  onClick={() =>
                    handleStatusChange(t.id, statusUpdate[t.id] || t.status)
                  }
                >
                  Keisti statusą
                </button>
              </div>
              <div className="mt-2">
                <textarea
                  className="form-control"
                  rows={2}
                  placeholder="Atsakymas"
                  value={answerText[t.id] || ""}
                  onChange={(e) =>
                    setAnswerText((prev) => ({
                      ...prev,
                      [t.id]: e.target.value,
                    }))
                  }
                />
                <button
                  className="btn btn-sm btn-success mt-1"
                  onClick={() => handleAnswer(t.id)}
                >
                  Atsakyti
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button className="btn btn-link mt-2" onClick={fetchTickets}>
        Atnaujinti
      </button>
    </div>
  );
}

export default AdminPanel;
