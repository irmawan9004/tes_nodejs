const express = require("express");
const { VehicleYear } = require("../models");
const auth = require("../middleware/auth");

const router = express.Router();

// GET all vehicle years
router.get("/", async (req, res) => {
  const years = await VehicleYear.findAll();
  res.send(years);
});

// GET vehicle year by ID
router.get("/:id", async (req, res) => {
  const year = await VehicleYear.findByPk(req.params.id);
  if (!year) return res.status(404).send("Vehicle year not found");
  res.send(year);
});

// POST new vehicle year
router.post("/", auth, async (req, res) => {
  const year = await VehicleYear.create(req.body);
  res.status(201).send(year);
});

// PATCH vehicle year by ID
router.patch("/:id", auth, async (req, res) => {
  const year = await VehicleYear.findByPk(req.params.id);
  if (!year) return res.status(404).send("Vehicle year not found");
  await year.update(req.body);
  res.send(year);
});

// DELETE vehicle year by ID
router.delete("/:id", auth, async (req, res) => {
  const year = await VehicleYear.findByPk(req.params.id);
  if (!year) return res.status(404).send("Vehicle year not found");
  await year.destroy();
  res.send(year);
});

module.exports = router;
