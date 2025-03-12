const dotenv = require("dotenv");
require('dotenv').config();

module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: `${process.env.SQL_PWD}`,
    DB: "exampleDb",
    dialect: "mysql",
    PORT: "3306",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    } 
}