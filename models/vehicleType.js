const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const VehicleBrand = require("./vehicleBrand");

const VehicleType = sequelize.define(
  "VehicleType",
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
    brand_id: {
      type: DataTypes.INTEGER,
      references: {
        model: VehicleBrand,
        key: "id",
      },
    },
  },
  {
    tableName: "vehicle_type",
  }
);

VehicleType.belongsTo(VehicleBrand, { foreignKey: "brand_id" });

module.exports = VehicleType;
