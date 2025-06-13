const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Middleware JWT autentifikacijai
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

// Sukurti naują užklausą (tik klientas)
router.post("/", auth, async (req, res) => {
  if (req.user.role !== "client")
    return res.status(403).json({ msg: "Tik klientas gali kurti užklausas" });
  const { title, description } = req.body;
  if (!title || !description)
    return res.status(400).json({ msg: "Užpildykite visus laukus" });
  try {
    const ticket = await Ticket.create({
      title,
      description,
      userId: req.user.id,
    });
    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ msg: "Serverio klaida", error: err.message });
  }
});

// Gauti visas savo užklausas (klientas)
router.get("/my", auth, async (req, res) => {
  if (req.user.role !== "client")
    return res
      .status(403)
      .json({ msg: "Tik klientas gali matyti savo užklausas" });
  try {
    const tickets = await Ticket.findAll({ where: { userId: req.user.id } });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ msg: "Serverio klaida", error: err.message });
  }
});

// Gauti visas užklausas (admin)
router.get("/", auth, async (req, res) => {
  if (req.user.role !== "admin")
    return res
      .status(403)
      .json({ msg: "Tik administratorius gali matyti visas užklausas" });
  try {
    const tickets = await Ticket.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ msg: "Serverio klaida", error: err.message });
  }
});

// Keisti užklausos statusą (admin)
router.patch("/:id/status", auth, async (req, res) => {
  if (req.user.role !== "admin")
    return res
      .status(403)
      .json({ msg: "Tik administratorius gali keisti statusą" });
  const { status } = req.body;
  if (!["pateiktas", "svarstomas", "ispręstas"].includes(status)) {
    return res.status(400).json({ msg: "Netinkamas statusas" });
  }
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) return res.status(404).json({ msg: "Užklausa nerasta" });
    ticket.status = status;
    await ticket.save();
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ msg: "Serverio klaida", error: err.message });
  }
});

module.exports = router;
