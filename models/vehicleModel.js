const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const VehicleType = require("./vehicleType");

const VehicleModel = sequelize.define(
  "VehicleModel",
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
    type_id: {
      type: DataTypes.INTEGER,
      references: {
        model: VehicleType,
        key: "id",
      },
    },
  },
  {
    tableName: "vehicle_model",
  }
);

VehicleModel.belongsTo(VehicleType, { foreignKey: "type_id" });

module.exports = VehicleModel;
