const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
  logging: false,
});

sequelize
  .sync({ alter: true })
  .then(() => console.log("Base de datos SQLite sincronizada 🚀"))
  .catch((error) => console.error("Error al sincronizar DB:", error));

module.exports = sequelize;
