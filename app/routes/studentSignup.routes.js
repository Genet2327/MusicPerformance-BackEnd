module.exports = (app) => {
    const studentSignup = require("../controllers/studentSignup.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Event
    router.post("/", [authenticate], studentSignup.create);
  
    // Retrieve all People
    router.get("/", [authenticate], studentSignup.findAll);
  
    // Retrieve a single Event with id
    router.get("/:id", [authenticate], studentSignup.findOne);
  
    // Update a Event with id
    router.put("/:id", [authenticate], studentSignup.update);
  
    // Delete a Event with id
    router.delete("/:id", [authenticate], studentSignup.delete);
  
    // Delete all Event
    router.delete("/", [authenticate], studentSignup.deleteAll);
  
    app.use("/performance-t6/studentSignup", router);
  };
  