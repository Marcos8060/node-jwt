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
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                len: [4, 20]
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate:{
                len: [4, 20]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6, 1024]
            }
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