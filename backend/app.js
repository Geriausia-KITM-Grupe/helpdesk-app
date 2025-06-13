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
