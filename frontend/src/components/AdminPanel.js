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
        fetchTickets();
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
        <div className="row">
          {tickets.map((t) => (
            <div key={t.id} className="col-md-6 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{t.title}</h5>
                  <p className="card-text">{t.description}</p>
                  <span className="badge bg-info text-dark me-2">
                    Statusas: {t.status}
                  </span>
                  <span className="badge bg-secondary">
                    Klientas: {t.User?.username}
                  </span>
                  <div className="mt-3">
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
                  <div className="mt-3">
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
                      className="btn btn-sm btn-success mt-2"
                      onClick={() => handleAnswer(t.id)}
                    >
                      Atsakyti
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <button className="btn btn-link mt-2" onClick={fetchTickets}>
        Atnaujinti
      </button>
    </div>
  );
}

export default AdminPanel;
