const express = require("express");
const { Pricelist } = require("../models");
const auth = require("../middleware/auth");

const router = express.Router();

// GET all pricelists
router.get("/", async (req, res) => {
  const pricelists = await Pricelist.findAll();
  res.send(pricelists);
});

// GET pricelist by ID
router.get("/:id", async (req, res) => {
  const pricelist = await Pricelist.findByPk(req.params.id);
  if (!pricelist) return res.status(404).send("Pricelist not found");
  res.send(pricelist);
});

// POST new pricelist
router.post("/", auth, async (req, res) => {
  const pricelist = await Pricelist.create(req.body);
  res.status(201).send(pricelist);
});

// PATCH pricelist by ID
router.patch("/:id", auth, async (req, res) => {
  const pricelist = await Pricelist.findByPk(req.params.id);
  if (!pricelist) return res.status(404).send("Pricelist not found");
  await pricelist.update(req.body);
  res.send(pricelist);
});

// DELETE pricelist by ID
router.delete("/:id", auth, async (req, res) => {
  const pricelist = await Pricelist.findByPk(req.params.id);
  if (!pricelist) return res.status(404).send("Pricelist not found");
  await pricelist.destroy();
  res.send(pricelist);
});

module.exports = router;
