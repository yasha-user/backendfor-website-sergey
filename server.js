const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

const port = 3000;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
    cookieSession({
        name: "yasha-session",
        keys: ["COOKIE_SECRET"],
        httpOnly: true,
    })
);


const { createDatabaseIfNeeded } = require('./app/database/db.js'); // Adjust path if needed
const { runMigrations } = require('./app/database/migrations.js'); // Adjust path if needed

// // Step 1: Create the database if it doesn't exist
// createDatabaseIfNeeded().then(() => {
//   // Step 2: Run migrations once the database exists
//   runMigrations();
// }).then(() => {
//   console.log('Server is starting...');
//     // Step 3: Start the Express server
//     app.listen(port, () => {
//         console.log(`Server is running on http://localhost:${port}`);
//       });
    
//     }).catch((err) => {
//       console.error('Error during database setup or migrations:', err);
//     });

    async function startServer() {
        try {
          // Step 1: Create the database if needed
          await createDatabaseIfNeeded();
          
          // Step 2: Run migrations once the database exists
          await runMigrations();

           
          require("./app/routes/auth.routes")(app)
          require("./app/routes/user.routes")(app)
          
              const db = await require("./app/models/index.js");
              const Role = db.role;

              db.sequelize.sync({force: false}).then(() => {
                console.log("Drop and resync db");
                initial();
            });


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
      
          // Step 3: Start the Express server
          console.log('Server is starting...');
          app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
          });
      
        } catch (err) {
          console.error('Error during database setup or migrations:', err);
        }
      }
      
      // Call the async function to start the server
      startServer();
      


    




app.get("/", (req, res) => {
    res.json({ message: "Welcome to the backend"})
});

// const PORT = process.env.PORT || 8080;

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}, http://localhost:8080/`)
// });