const express = require("express");
const router = express.Router();
const FAQ = require("../models/FAQ");
const jwt = require("jsonwebtoken");

// Middleware JWT autentifikacijai (naudojamas tik kur reikia)
function auth(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ msg: "Nėra tokeno" });
  try {
    const decoded = jwt.verify(
      token.split(" ")[1],
      process.env.JWT_SECRET || "slaptas_raktas"
    );
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ msg: "Netinkamas tokenas" });
  }
}

// Gauti visus FAQ su filtru pagal kategoriją arba paiešką
router.get("/", async (req, res) => {
  const { category, q } = req.query;
  let where = {};
  if (category) where.category = category;
  if (q) where.question = { $like: `%${q}%` };
  try {
    const faqs = await FAQ.findAll({ where, order: [["trustCount", "DESC"]] });
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ msg: "Serverio klaida", error: err.message });
  }
});

// Pridėti naują FAQ (tik admin)
router.post("/", auth, async (req, res) => {
  if (req.user.role !== "admin")
    return res
      .status(403)
      .json({ msg: "Tik administratorius gali pridėti FAQ" });
  const { question, answer, category } = req.body;
  if (!question || !answer || !category)
    return res.status(400).json({ msg: "Užpildykite visus laukus" });
  try {
    const faq = await FAQ.create({ question, answer, category });
    res.status(201).json(faq);
  } catch (err) {
    res.status(500).json({ msg: "Serverio klaida", error: err.message });
  }
});

// Reitinguoti atsakymą (pridėti "patikimą")
router.patch("/:id/trust", async (req, res) => {
  try {
    const faq = await FAQ.findByPk(req.params.id);
    if (!faq) return res.status(404).json({ msg: "FAQ nerastas" });
    faq.trustCount += 1;
    await faq.save();
    res.json({ trustCount: faq.trustCount });
  } catch (err) {
    res.status(500).json({ msg: "Serverio klaida", error: err.message });
  }
});

module.exports = router;
