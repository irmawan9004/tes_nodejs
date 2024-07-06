const express = require("express");
const { Pricelist } = require("../models");
const auth = require("../middleware/auth");

const router = express.Router();

// GET all pricelists with pagination and filtering
router.get("/", auth, async (req, res) => {
  const { limit = 10, offset = 0, code, price, year_id, model_id } = req.query;
  const filter = {};
  if (code) filter.code = code;
  if (price) filter.price = price;
  if (year_id) filter.year_id = year_id;
  if (model_id) filter.model_id = model_id;
  const pricelists = await Pricelist.findAndCountAll({
    where: filter,
    limit: parseInt(limit),
    offset: parseInt(offset),
  });
  res.send({
    total: pricelists.count,
    limit: parseInt(limit),
    offset: parseInt(offset),
    data: pricelists.rows,
  });
});

// GET a pricelist by ID
router.get("/:id", auth, async (req, res) => {
  const pricelist = await Pricelist.findByPk(req.params.id);
  if (!pricelist) return res.status(404).send("Pricelist not found");
  res.send(pricelist);
});

// POST a new pricelist
router.post("/", auth, async (req, res) => {
  const pricelist = await Pricelist.create(req.body);
  res.status(201).send(pricelist);
});

// PATCH a pricelist by ID
router.patch("/:id", auth, async (req, res) => {
  const pricelist = await Pricelist.findByPk(req.params.id);
  if (!pricelist) return res.status(404).send("Pricelist not found");
  await pricelist.update(req.body);
  res.send(pricelist);
});

// DELETE a pricelist by ID
router.delete("/:id", auth, async (req, res) => {
  const pricelist = await Pricelist.findByPk(req.params.id);
  if (!pricelist) return res.status(404).send("Pricelist not found");
  await pricelist.destroy();
  res.send(pricelist);
});

module.exports = router;
