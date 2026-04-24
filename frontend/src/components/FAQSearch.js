import React, { useEffect, useState } from "react";

const FAQ_CATEGORIES = ["Paskyra", "Pagalba", "Informacija"];

function FAQSearch() {
  const [faqs, setFaqs] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  // Auto-clear message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const fetchFaqs = async (selectedCategory = category) => {
    let url = "http://localhost:5001/api/faq?";
    if (query) url += `q=${encodeURIComponent(query)}&`;
    if (selectedCategory)
      url += `category=${encodeURIComponent(selectedCategory)}&`;
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

  const handleCategoryClick = (value) => {
    setCategory(value);
    setMessage("");
    fetchFaqs(value);
  };

  const handleTrust = async (id) => {
    setMessage("");
    try {
      const res = await fetch(`http://localhost:5001/api/faq/${id}/trust`, {
        method: "PATCH",
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Ačiū už įvertinimą!");
        setFaqs((prevFaqs) =>
          prevFaqs.map((faq) =>
            faq._id === id ? { ...faq, trustCount: data.trustCount } : faq,
          ),
        );
      } else {
        setMessage(data.msg || "Klaida pridedant patikimą");
      }
    } catch (err) {
      setMessage("Serverio klaida");
    }
  };

  return (
    <div className="mt-4">
      <h4>Dažniausiai užduodami klausimai</h4>
      <form className="row g-2 mb-3" onSubmit={handleSearch}>
        <div className="col-12 col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Ieškoti klausimo"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-4">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Visos kategorijos</option>
            {FAQ_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="col-12 col-md-3 d-grid">
          <button className="btn btn-primary" type="submit">
            Ieškoti
          </button>
        </div>
      </form>
      <div className="mb-3 d-flex flex-wrap gap-2">
        <button
          type="button"
          className={`btn btn-sm ${category === "" ? "btn-primary" : "btn-outline-secondary"}`}
          onClick={() => handleCategoryClick("")}
        >
          Visos
        </button>
        {FAQ_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`btn btn-sm ${category === cat ? "btn-primary" : "btn-outline-secondary"}`}
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      {message && <div className="alert alert-success">{message}</div>}
      <div className="mb-3 text-muted">
        Rasta {faqs.length} {faqs.length === 1 ? "FAQ" : "FAQ"}{" "}
        {category ? `kategorijoje „${category}“` : "visose kategorijose"}.
      </div>
      {faqs.length === 0 ? (
        <div>FAQ nerasta.</div>
      ) : (
        <div>
          {faqs.map((faq) => (
            <div key={faq._id} className="card mb-2">
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
                  type="button"
                  className="btn btn-outline-success btn-sm"
                  onClick={() => handleTrust(faq._id)}
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
