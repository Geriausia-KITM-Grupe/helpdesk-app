import React, { useEffect, useState } from "react";

function TicketList({ refresh }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5001/api/tickets/my", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      if (res.ok) {
        setTickets(data);
      }
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    fetchTickets();
    // eslint-disable-next-line
  }, [refresh]);

  return (
    <div>
      <h4>Jūsų užklausos</h4>
      {loading ? (
        <div>Kraunama...</div>
      ) : tickets.length === 0 ? (
        <div>Užklausų nėra.</div>
      ) : (
        <div className="row">
          {tickets.map((t) => (
            <div key={t._id} className="col-md-12 mb-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h5 className="card-title mb-1">{t.title}</h5>
                      <div className="text-muted small">
                        {new Date(t.createdAt).toLocaleDateString("lt-LT", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                    <span className={getStatusBadgeClass(t.status)}>
                      {t.status}
                    </span>
                  </div>
                  <p className="card-text">{t.description}</p>
                  {t.latestAnswer && (
                    <div className="mt-3 p-3 border rounded bg-light">
                      <div className="fw-semibold mb-2">Admin atsakymas</div>
                      <p className="mb-1">{t.latestAnswer.answerText}</p>
                      <div className="small text-muted">
                        Atsakė: {t.latestAnswer.adminId?.username || "Admin"}
                      </div>
                    </div>
                  )}
                  <div className="mt-3">
                    <span className="badge bg-secondary me-2">
                      {t.category || "Kita"}
                    </span>
                    <span className="badge bg-light text-dark">Užklausa</span>
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

export default TicketList;
