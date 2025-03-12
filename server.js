const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

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


require("./app/routes/auth.routes")(app)
require("./app/routes/user.routes")(app)

    const db = require("./app/models/index.js");
    const Role = db.role;

// app.use('/', (req, res, next) => {
//     initial();
//     next()
// })


db.sequelize.sync({force: true}).then(() => {
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


app.get("/", (req, res) => {
    res.json({ message: "Welcome to the backend"})
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}, http://localhost:8080/`)
});