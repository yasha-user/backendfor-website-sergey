const { Sequelize } = require('sequelize');
const dotenv = require("dotenv");
require('dotenv').config();

// Create a Sequelize instance without connecting to a specific database yet
const sequelize = new Sequelize(`mysql://root:${process.env.SQL_PWD}@127.0.0.1:3306`, {
  dialect: 'mysql',
  logging: false,
});

// Function to create database if it doesn't exist
async function createDatabaseIfNeeded() {
  try {
    // Connect to MySQL server (without specifying a database)
    await sequelize.authenticate();
    console.log('Connection to MySQL has been established successfully.');

    // Check if the database exists
    const dbName = 'exampleDb';
    const [results, metadata] = await sequelize.query(`SHOW DATABASES LIKE '${dbName}'`);

    // If the database doesn't exist, create it
    if (results.length === 0) {
      console.log(`Database ${dbName} does not exist. Creating it...`);
      await sequelize.query(`CREATE DATABASE ${dbName}`);
      console.log(`Database ${dbName} created successfully.`);
    } else {
      console.log(`Database ${dbName} already exists.`);
    }

    // Now, connect to the newly created or existing database
    sequelize.options.database = dbName;
    await sequelize.authenticate(); // Re-authenticate with the correct database
    console.log(`Successfully connected to database: ${dbName}`);

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = { sequelize, createDatabaseIfNeeded };
