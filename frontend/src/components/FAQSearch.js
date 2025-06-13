import React, { useEffect, useState } from "react";

function FAQSearch() {
  const [faqs, setFaqs] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const fetchFaqs = async () => {
    let url = "http://localhost:5000/api/faq?";
    if (query) url += `q=${encodeURIComponent(query)}&`;
    if (category) url += `category=${encodeURIComponent(category)}&`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) setFaqs(data);
    } catch {}
  };

  useEffect(() => {
    fetchFaqs();
    // eslint-disable-next-line
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchFaqs();
  };

  const handleTrust = async (id) => {
    setMessage("");
    try {
      const res = await fetch(`http://localhost:5000/api/faq/${id}/trust`, {
        method: "PATCH",
      });
      if (res.ok) {
        setMessage("Ačiū už įvertinimą!");
        fetchFaqs();
      }
    } catch {}
  };

  return (
    <div className="mt-4">
      <h4>Dažniausiai užduodami klausimai</h4>
      <form className="row g-2 mb-3" onSubmit={handleSearch}>
        <div className="col-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Ieškoti klausimo"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="col-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Kategorija"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="col-auto">
          <button className="btn btn-primary" type="submit">
            Ieškoti
          </button>
        </div>
      </form>
      {message && <div className="alert alert-success">{message}</div>}
      {faqs.length === 0 ? (
        <div>FAQ nerasta.</div>
      ) : (
        <div>
          {faqs.map((faq) => (
            <div key={faq.id} className="card mb-2">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">{faq.question}</h5>
                  <span className="badge bg-success">
                    Patikimų: {faq.trustCount}
                  </span>
                </div>
                <p className="card-text">{faq.answer}</p>
                <span className="badge bg-secondary mb-2">
                  Kategorija: {faq.category}
                </span>
                <br />
                <button
                  className="btn btn-outline-success btn-sm"
                  onClick={() => handleTrust(faq.id)}
                >
                  Patikima
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FAQSearch;
