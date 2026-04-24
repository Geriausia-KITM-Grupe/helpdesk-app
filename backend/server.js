const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Helpdesk API veikia!");
});

const userRoutes = require("./routes/user");
app.use("/api/users", userRoutes);

const ticketRoutes = require("./routes/ticket");
app.use("/api/tickets", ticketRoutes);

const answerRoutes = require("./routes/answer");
app.use("/api/answers", answerRoutes);

const faqRoutes = require("./routes/faq");
app.use("/api/faq", faqRoutes);

const connectDB = require("./config/db");
const User = require("./models/User");
const Ticket = require("./models/Ticket");
const Answer = require("./models/Answer");
const FAQ = require("./models/FAQ");

connectDB().then(() => {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`Serveris paleistas ant ${PORT}`));
});
