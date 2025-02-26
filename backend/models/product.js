const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Product = sequelize.define(
  "Product",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING },
    datasheet: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
  },
  {
    timestamps: true,
  }
);

module.exports = Product;
