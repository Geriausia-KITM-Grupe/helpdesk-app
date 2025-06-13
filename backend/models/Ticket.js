const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Ticket = sequelize.define("Ticket", {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  status: {
    type: DataTypes.ENUM("pateiktas", "svarstomas", "ispręstas"),
    defaultValue: "pateiktas",
  },
});

Ticket.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Ticket, { foreignKey: "userId" });

module.exports = Ticket;
