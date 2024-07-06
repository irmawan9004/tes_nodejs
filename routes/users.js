const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const auth = require("../middleware/auth");

const router = express.Router();

// User registration
router.post("/register", async (req, res) => {
  try {
    const { name, password, is_admin } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      is_admin,
      password: hashedPassword,
    });
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send("Error registering user");
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ where: { name } });
    if (!user) return res.status(400).send("Invalid name or password.");
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).send("Invalid name or password.");

    const token = jwt.sign(
      { id: user.id, is_admin: user.is_admin },
      "your_jwt_private_key"
    );
    res.send({ token });
  } catch (error) {
    res.status(500).send("Error logging in user");
  }
});

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (error) {
    res.status(500).send("Error fetching users");
  }
});

// GET user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.send(user);
  } catch (error) {
    res.status(500).send("Error fetching user");
  }
});

// PATCH user by ID
router.patch("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).send("User not found");
    await user.update(req.body);
    res.send(user);
  } catch (error) {
    res.status(500).send("Error updating user");
  }
});

// DELETE user by ID
router.delete("/:id", auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).send("User not found");
    await user.destroy();
    res.send(user);
  } catch (error) {
    res.status(500).send("Error deleting user");
  }
});

module.exports = router;
