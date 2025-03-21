const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
const express = require('express');
const cors = require("cors");
const cookieSession = require("cookie-session");
const PORT = process.env.PORT || 8080;

const dotenv = require("dotenv");
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(
    cookieSession({
        name: "yasha-session",
        keys: ["COOKIE_SECRET"],
        httpOnly: true,
    })
);

// const { createDatabaseIfNeeded } = require('./app/database/db.js'); // Adjust path if needed
// const { runMigrations } = require('./app/database/migrations.js'); // Adjust path if needed

// // // Step 1: Create the database if it doesn't exist
// // createDatabaseIfNeeded().then(() => {
// //   // Step 2: Run migrations once the database exists
// //   runMigrations();
// // }).then(() => {
// //   console.log('Server is starting...');
// //     // Step 3: Start the Express server
// //     app.listen(port, () => {
// //         console.log(`Server is running on http://localhost:${port}`);
// //       });
    
// //     }).catch((err) => {
// //       console.error('Error during database setup or migrations:', err);
// //     });

//     async function startServer() {
//         try {
//           // Step 1: Create the database if needed
//           await createDatabaseIfNeeded();
          
//           // Step 2: Run migrations once the database exists
        //   await runMigrations();


async function initializeDatabase() {
  const config = {
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: `${process.env.SQL_PWD}`, // Replace with your MySQL password
  };

  // Connect to MySQL server without specifying a database
  const connection = await mysql.createConnection(config);

  // Check if 'exampleDb' exists; if not, create it
  await connection.query("CREATE DATABASE IF NOT EXISTS `exampleDb`;");

  // Close the initial connection
  await connection.end();

  // Update config to include the database name
  config.database = 'exampleDb';

  // Connect to 'exampleDb'
  const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: 'mysql',
  });

  // Initialize models and sync database
  // Example: 
  const User = require('./app/models/user.model.js')(sequelize);
  const Role = require('./app/models/role.model')(sequelize);
  await sequelize.sync({force: true});
  console.log("Drop and resync db");

  return sequelize;
}

async function startServer() {
  try {
    const sequelize = await initializeDatabase();

    // Your model initialization and synchronization code here

    // Start the Express server
    console.log('Server is starting...');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

          require("./app/routes/auth.routes")(app)
          require("./app/routes/user.routes")(app)
          
              const db = await require("./app/models/index.js");
              const Role = db.role;
              await initial();

              // db.sequelize.sync({force: true}).then(() => {            });
              // console.log("Drop and resync db");


function initial(){
    Role.create({
        id: 1,
        name: "user"
    })
}

Role.create({
    id: 2,
    name: "moderator"
})

Role.create({
    id: 3,
    name: "admin"
})

  } catch (err) {
    console.error('Error during database setup or server startup:', err);
  }
}

// Call the async function to start the server
startServer();


app.get("/", (req, res) => {
    res.json({ message: "Welcome to the backend"})
});