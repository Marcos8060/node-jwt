const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

// initialize
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: "localhost",
        dialect: "postgres"
    }
)

// define models
const User = sequelize.define(
    "User",
    {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: true
    }
)

// sync the model with the database
 sequelize.sync().then(() => {
    console.log("User model has been successfully defined and synchronized with the database.");
}).catch((error) => {
    console.error("Unable to sync User model with the database:", error);
});

module.exports = User;