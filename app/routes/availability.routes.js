module.exports = (app) => {
    const availability = require("../controllers/availability.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Event
    router.post("/", [authenticate], availability.create);
  
    // Retrieve all People
    router.get("/", [authenticate], availability.findAll);
  
    // Retrieve a single Event with id
    router.get("/:id", [authenticate], availability.findOne);
  
    // Update a Event with id
    router.put("/:id", [authenticate], availability.update);
  
    // Delete a Event with id
    router.delete("/:id", [authenticate], availability.delete);
  
    // Delete all Event
    router.delete("/", [authenticate], availability.deleteAll);
  
    app.use("/performance-t6/availability", router);
  };
  