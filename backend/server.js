require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
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

const sequelize = require("./config/db");
const User = require("./models/User");
const Ticket = require("./models/Ticket");
const Answer = require("./models/Answer");
const FAQ = require("./models/FAQ");

sequelize.sync().then(() => {
  console.log("DB sinchronizuota");
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Serveris paleistas ant ${PORT}`));
});
