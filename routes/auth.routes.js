const router = require("express").Router();
const User = require("../models/auth.model");
const { RegisterValidation, LoginValidation } = require("../validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// REGISTER
router.post("/register", async (req, res) => {
  // Validate data before processing
  const { error } = RegisterValidation(req.body);
  // If validation fails, return an error response
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  //   check if email already registered
  const emailExists = await User.findOne({ where: { email: req.body.email } });
  if (emailExists) {
    return res.status(400).json({ message: "Email already registered" });
  }

  //   Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { error } = LoginValidation(req.body);
  // If validation fails, return an error response
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  //   check if email already registered
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) {
    return res.status(400).json({ message: "Email not found" });
  }

  // validate password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: "Invalid password" });
  }

  //   create and assign a token to the user
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    process.env.TOKEN_SECRET
  );

  res.header("access_token", token).send(token);
  //   res.json({ message: "Login successful", user: { id: user.id, name: user.name, email: user.email } });
});
module.exports = router;
