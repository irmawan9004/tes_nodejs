const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("db_vehicle", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
