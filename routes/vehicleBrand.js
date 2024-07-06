const express = require("express");
const { VehicleBrand } = require("../models");
const auth = require("../middleware/auth");

const router = express.Router();

// GET all vehicle brands
router.get("/", async (req, res) => {
  const brands = await VehicleBrand.findAll();
  res.send(brands);
});

// GET vehicle brand by ID
router.get("/:id", async (req, res) => {
  const brand = await VehicleBrand.findByPk(req.params.id);
  if (!brand) return res.status(404).send("Vehicle brand not found");
  res.send(brand);
});

// POST new vehicle brand
router.post("/", auth, async (req, res) => {
  const brand = await VehicleBrand.create(req.body);
  res.status(201).send(brand);
});

// PATCH vehicle brand by ID
router.patch("/:id", auth, async (req, res) => {
  const brand = await VehicleBrand.findByPk(req.params.id);
  if (!brand) return res.status(404).send("Vehicle brand not found");
  await brand.update(req.body);
  res.send(brand);
});

// DELETE vehicle brand by ID
router.delete("/:id", auth, async (req, res) => {
  const brand = await VehicleBrand.findByPk(req.params.id);
  if (!brand) return res.status(404).send("Vehicle brand not found");
  await brand.destroy();
  res.send(brand);
});

module.exports = router;
