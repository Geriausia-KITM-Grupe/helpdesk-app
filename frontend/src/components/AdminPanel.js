import React, { useEffect, useState } from "react";

function AdminPanel() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answerText, setAnswerText] = useState({});
  const [statusUpdate, setStatusUpdate] = useState({});
  const [message, setMessage] = useState("");

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "ispręstas":
        return "badge bg-success";
      case "svarstomas":
        return "badge bg-warning text-dark";
      default:
        return "badge bg-danger";
    }
  };

  // Auto-clear message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5001/api/tickets", {
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
        `http://localhost:5001/api/tickets/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({ status }),
        },
      );
      if (res.ok) {
        setMessage("Statusas atnaujintas!");
        // Clear the status update state for this ticket
        setStatusUpdate((prev) => {
          const newState = { ...prev };
          delete newState[id];
          return newState;
        });
        fetchTickets();
      } else {
        setMessage("Klaida atnaujinant statusą");
      }
    } catch {
      setMessage("Serverio klaida");
    }
  };

  const handleAnswer = async (ticketId) => {
    setMessage("");
    try {
      const res = await fetch("http://localhost:5001/api/answers", {
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
            <div key={t._id} className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{t.title}</h5>
                  <div className="d-flex justify-content-between mb-2">
                    <span className={`${getStatusBadgeClass(t.status)} me-2`}>
                      {t.status}
                    </span>
                    <span className="badge bg-secondary">
                      {t.category || "Kita"}
                    </span>
                  </div>
                  <p className="card-text">{t.description}</p>
                  <div className="mb-2">
                    <span className="badge bg-secondary">
                      Klientas: {t.userId?.username}
                    </span>
                  </div>
                  <div className="mt-3 d-flex align-items-center gap-2 flex-wrap">
                    <select
                      className="form-select form-select-sm w-auto"
                      value={statusUpdate[t._id] || t.status}
                      onChange={(e) =>
                        setStatusUpdate((prev) => ({
                          ...prev,
                          [t._id]: e.target.value,
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
                        handleStatusChange(
                          t._id,
                          statusUpdate[t._id] || t.status,
                        )
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
                      value={answerText[t._id] || ""}
                      onChange={(e) =>
                        setAnswerText((prev) => ({
                          ...prev,
                          [t._id]: e.target.value,
                        }))
                      }
                    />
                    <button
                      className="btn btn-sm btn-success mt-2"
                      onClick={() => handleAnswer(t._id)}
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
