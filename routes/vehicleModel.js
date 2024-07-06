const express = require("express");
const { VehicleModel } = require("../models");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  const brands = await VehicleModel.findAll();
  res.send(brands);
});

// GET vehicle brand by ID
router.get("/:id", async (req, res) => {
  const brand = await VehicleModel.findByPk(req.params.id);
  if (!brand) return res.status(404).send("Vehicle brand not found");
  res.send(brand);
});

// POST new vehicle brand
router.post("/", auth, async (req, res) => {
  const brand = await VehicleModel.create(req.body);
  res.status(201).send(brand);
});
router.patch("/:id", auth, async (req, res) => {
  const model = await VehicleModel.findByPk(req.params.id);
  if (!model) return res.status(404).send("Model not found");
  await model.update(req.body);
  res.send(model);
});

// DELETE a vehicle model by ID
router.delete("/:id", auth, async (req, res) => {
  const model = await VehicleModel.findByPk(req.params.id);
  if (!model) return res.status(404).send("Model not found");
  await model.destroy();
  res.send(model);
});

module.exports = router;
