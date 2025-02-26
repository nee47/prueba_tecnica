const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Email = sequelize.define(
  "Email",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, allowNull: false },
  },
  {
    timestamps: true,
  }
);

module.exports = Email;
