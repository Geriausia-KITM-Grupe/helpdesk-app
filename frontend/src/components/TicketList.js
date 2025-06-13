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
        <ul className="list-group">
          {tickets.map((t) => (
            <li key={t.id} className="list-group-item">
              <b>{t.title}</b> <br />
              {t.description} <br />
              <span className="badge bg-info text-dark">
                Statusas: {t.status}
              </span>
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

export default TicketList;
