const sequelize = require("../config/database");
const User = require("./user");
const VehicleBrand = require("./vehicleBrand");
const VehicleType = require("./vehicleType");
const VehicleYear = require("./vehicleYear");
const VehicleModel = require("./vehicleModel");
const Pricelist = require("./pricelist");

VehicleType.belongsTo(VehicleBrand, { foreignKey: "brand_id" });
VehicleModel.belongsTo(VehicleType, { foreignKey: "type_id" });
Pricelist.belongsTo(VehicleYear, { foreignKey: "year_id" });
Pricelist.belongsTo(VehicleModel, { foreignKey: "model_id" });

module.exports = {
  sequelize,
  User,
  VehicleBrand,
  VehicleType,
  VehicleYear,
  VehicleModel,
  Pricelist,
};
