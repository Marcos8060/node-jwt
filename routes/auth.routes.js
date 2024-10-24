const router = require("express").Router();
const User = require("../models/auth.model");
const { RegisterValidation } = require("../validation");
const bcrypt = require("bcrypt");



router.post("/register", async (req, res) => {
  // Validate data before processing
  const { error } = RegisterValidation(req.body);
  // If validation fails, return an error response
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  //   check if email already registered
  const emailExists = await User.findOne({where: { email: req.body.email }});
  if (emailExists) {
    return res.status(400).json({ message: "Email already registered" }); // Return error if email already exists in the database.  // Remember, this is just a simple check and you may want to add more robust email validation. For example, using a regular expression or a library like validator.js.  // Also, this is server-side validation and not client-side.  // Make sure to handle this in your frontend code as well.  // This code is only for demonstration purposes.  // In a real-world application, you would need to handle this on the frontend as well.  // For example, you could show an error message to the user when they try to register with an already registered email.  // In a production environment, you would also want to add a mechanism to send a confirmation email to the user after registration.  // You could use a library like nodemailer for this purpose.  // But please note that
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

module.exports = router;
