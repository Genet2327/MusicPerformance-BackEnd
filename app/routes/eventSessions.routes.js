module.exports = (app) => {
    const eventSessions = require("../controllers/eventSessions.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Event
    router.post("/", [authenticate], eventSessions.create);
  
    // Retrieve all People
    router.get("/", [authenticate], eventSessions.findAll);
  
    // Retrieve a single Event with id
    router.get("/:id", [authenticate], eventSessions.findOne);
  
    // Update a Event with id
    router.put("/:id", [authenticate], eventSessions.update);
  
    // Delete a Event with id
    router.delete("/:id", [authenticate], eventSessions.delete);
  
    // Delete all Event
    router.delete("/", [authenticate], eventSessions.deleteAll);
  
    app.use("/performance-t6/eventSessions", router);
  };
  