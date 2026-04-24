const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    answerText: { type: String, required: true },
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Answer", answerSchema);
