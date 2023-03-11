require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./app/models");
const Role = db.role;

//db.sequelize.sync();

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});






var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.options("*", cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});


function initial() {

 
 
  Role.create({
    id: 1,
    name: "Admin"
  });

 
  
    Role.create({
    id: 2,
    name: "Student"
  });
 
  Role.create({
    id: 3,
    name: "Accompanist"
  });
  Role.create({
    id: 4,
    name: "juges"
  });
  Role.create({
    id: 5,
    name: "faculity"
  });
}
require("./app/routes/auth.routes.js")(app);
require("./app/routes/user.routes")(app);

require("./app/routes/event.routes")(app);
require("./app/routes/eventSessions.routes")(app);
require("./app/routes/instrument.routes")(app);
require("./app/routes/composer.routes")(app);
require("./app/routes/critique.routes")(app);
require("./app/routes/song.routes")(app);
require("./app/routes/repertoire.routes")(app);
require("./app/routes/availability.routes")(app);
require("./app/routes/role.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 3026;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
