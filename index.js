const express = require("express");
const { Client } = require("pg"); // postgres client instance
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// configure postgresql connection
const client = new Client({
  user: process.env.DB_USER,
  host: "localhost", // Your database host
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432, // Default PostgreSQL port
});

// Connect to the PostgreSQL database
client
  .connect()
  .then(() => {
    console.log("Connected to the PostgreSQL database");
    // Start the Express server after successful database connection
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Connection Failed", err);
  });


  // middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Import Routes
const authRoute = require("./routes/auth.routes");
const postRoute = require('./routes/posts');

// route middleware
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);



