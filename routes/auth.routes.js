const router = require("express").Router();
const User = require("../models/auth.model");
const Joi = require("joi");

// Define validation schema
const schema = Joi.object({
  name: Joi.string().min(4).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

router.post("/register", async (req, res) => {
  // Validate data before processing
  const { error } = schema.validate(req.body); // Use schema.validate
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
