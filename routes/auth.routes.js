const router = require("express").Router();
const User = require("../models/auth.model");
const { RegisterValidation } = require('../validation')

// Define validation schema


router.post("/register", async (req, res) => {
  // Validate data before processing
  const { error } = RegisterValidation(req.body)
  // If validation fails, return an error response
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
