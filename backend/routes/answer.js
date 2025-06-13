const express = require("express");
const router = express.Router();
const Answer = require("../models/Answer");
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

// Pridėti atsakymą į užklausą (tik admin)
router.post("/", auth, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ msg: "Tik administratorius gali atsakyti" });
  const { ticketId, answerText } = req.body;
  if (!ticketId || !answerText)
    return res.status(400).json({ msg: "Užpildykite visus laukus" });
  try {
    const ticket = await Ticket.findByPk(ticketId);
    if (!ticket) return res.status(404).json({ msg: "Užklausa nerasta" });
    const answer = await Answer.create({
      ticketId,
      answerText,
      adminId: req.user.id,
    });
    res.status(201).json(answer);
  } catch (err) {
    res.status(500).json({ msg: "Serverio klaida", error: err.message });
  }
});

// Gauti visus atsakymus pagal užklausos ID (klientas arba admin)
router.get("/ticket/:ticketId", auth, async (req, res) => {
  try {
    const answers = await Answer.findAll({
      where: { ticketId: req.params.ticketId },
      include: [{ model: User, as: "User", attributes: ["username", "role"] }],
    });
    res.json(answers);
  } catch (err) {
    res.status(500).json({ msg: "Serverio klaida", error: err.message });
  }
});

module.exports = router;
