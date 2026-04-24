const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: [
        "Paskyra",
        "Techninė pagalba",
        "Apmokėjimas",
        "Nustatymai",
        "Kita",
      ],
      default: "Kita",
    },
    status: {
      type: String,
      enum: ["pateiktas", "svarstomas", "ispręstas"],
      default: "pateiktas",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Ticket", ticketSchema);
