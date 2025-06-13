require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Paprastas test route
app.get("/", (req, res) => {
  res.send("Helpdesk API veikia!");
});

// Pradėsime nuo user route (bus papildyta vėliau)
const userRoutes = require("./routes/user");
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveris paleistas ant ${PORT}`));
