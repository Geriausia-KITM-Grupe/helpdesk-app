const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sequelize = require("../config/db");

// Registracija
router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password) {
    return res.status(400).json({ msg: "Užpildykite visus laukus" });
  }
  try {
    const existing = await User.findOne({ where: { username } });
    if (existing) {
      return res.status(400).json({ msg: "Toks vartotojas jau egzistuoja" });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hash,
      role: role || "client",
    });
    res.status(201).json({
      msg: "Registracija sėkminga",
      user: { id: user.id, username: user.username, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ msg: "Serverio klaida", error: err.message });
  }
});

// Prisijungimas
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ msg: "Užpildykite visus laukus" });
  }
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ msg: "Neteisingi prisijungimo duomenys" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ msg: "Neteisingi prisijungimo duomenys" });
    }
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || "slaptas_raktas",
      { expiresIn: "1d" }
    );
    res.json({
      token,
      user: { id: user.id, username: user.username, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ msg: "Serverio klaida", error: err.message });
  }
});

module.exports = router;
