const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");

const app = express();

app.use(bodyParser.json());

// Import routes
const userRoutes = require("./routes/users");
const vehicleBrandRoutes = require("./routes/vehicleBrand");
// const vehicleTypeRoutes = require("./routes/vehicleType");
// const vehicleYearRoutes = require("./routes/vehicleYear");
// const vehicleModelRoutes = require("./routes/vehicleModel");
// const pricelistRoutes = require("./routes/pricelist");

// Use routes
app.use("/users", userRoutes);
app.use("/vehicle-brands", vehicleBrandRoutes);
// app.use("/vehicle-types", vehicleTypeRoutes);
// app.use("/vehicle-years", vehicleYearRoutes);
// app.use("/vehicle-models", vehicleModelRoutes);
// app.use("/pricelists", pricelistRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await sequelize.sync({ force: true });
  console.log("Database synced!");
});
