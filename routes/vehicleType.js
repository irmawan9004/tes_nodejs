const express = require("express");
const { VehicleType } = require("../models");
const auth = require("../middleware/auth");

const router = express.Router();

// GET all vehicle types with optional filtering by brand_id
router.get("/", async (req, res) => {
  const { brand_id } = req.query;

  const whereClause = {};
  if (brand_id) {
    whereClause.brand_id = brand_id;
  }

  const types = await VehicleType.findAll({ where: whereClause });
  res.send(types);
});

// GET vehicle type by ID
router.get("/:id", async (req, res) => {
  const type = await VehicleType.findByPk(req.params.id);
  if (!type) return res.status(404).send("Vehicle type not found");
  res.send(type);
});

// POST new vehicle type
router.post("/", auth, async (req, res) => {
  const type = await VehicleType.create(req.body);
  res.status(201).send(type);
});

// PATCH vehicle type by ID
router.patch("/:id", auth, async (req, res) => {
  const type = await VehicleType.findByPk(req.params.id);
  if (!type) return res.status(404).send("Vehicle type not found");
  await type.update(req.body);
  res.send(type);
});

// DELETE vehicle type by ID
router.delete("/:id", auth, async (req, res) => {
  const type = await VehicleType.findByPk(req.params.id);
  if (!type) return res.status(404).send("Vehicle type not found");
  await type.destroy();
  res.send(type);
});

module.exports = router;
