const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const FAQ = sequelize.define("FAQ", {
  question: { type: DataTypes.STRING, allowNull: false },
  answer: { type: DataTypes.TEXT, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  trustCount: { type: DataTypes.INTEGER, defaultValue: 0 },
});

module.exports = FAQ;
