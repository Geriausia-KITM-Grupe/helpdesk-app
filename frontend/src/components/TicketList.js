import React, { useEffect, useState } from "react";

function TicketList({ refresh }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/tickets/my", {
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
            <div key={t.id} className="col-md-12 mb-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{t.title}</h5>
                  <p className="card-text">{t.description}</p>
                  <span className="badge bg-info text-dark">
                    Statusas: {t.status}
                  </span>
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
