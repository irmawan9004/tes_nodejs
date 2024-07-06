const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const VehicleYear = require("./vehicleYear");
const VehicleModel = require("./vehicleModel");

const Pricelist = sequelize.define(
  "Pricelist",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    year_id: {
      type: DataTypes.INTEGER,
      references: {
        model: VehicleYear,
        key: "id",
      },
    },
    model_id: {
      type: DataTypes.INTEGER,
      references: {
        model: VehicleModel,
        key: "id",
      },
    },
  },
  {
    tableName: "pricelist",
  }
);

Pricelist.belongsTo(VehicleYear, { foreignKey: "year_id" });
Pricelist.belongsTo(VehicleModel, { foreignKey: "model_id" });

module.exports = Pricelist;
