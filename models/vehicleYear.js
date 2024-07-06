const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const VehicleYear = sequelize.define(
  "VehicleYear",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "vehicle_year",
  }
);

module.exports = VehicleYear;
