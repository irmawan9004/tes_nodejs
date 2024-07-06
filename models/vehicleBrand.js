const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const VehicleBrand = sequelize.define(
  "VehicleBrand",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "vehicle_brand",
  }
);

module.exports = VehicleBrand;
