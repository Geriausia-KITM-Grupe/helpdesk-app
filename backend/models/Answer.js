const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Ticket = require("./Ticket");
const User = require("./User");

const Answer = sequelize.define("Answer", {
  answerText: { type: DataTypes.TEXT, allowNull: false },
});

Answer.belongsTo(Ticket, { foreignKey: "ticketId" });
Ticket.hasMany(Answer, { foreignKey: "ticketId" });

Answer.belongsTo(User, { foreignKey: "adminId" }); // Atsakymą pateikė adminas
User.hasMany(Answer, { foreignKey: "adminId" });

module.exports = Answer;
