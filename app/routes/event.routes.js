module.exports = (app) => {
    const event = require("../controllers/event.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Event
    router.post("/:eventSessionId/events", [authenticate], event.create);
  
    // Retrieve all People
    router.get("/:eventSessionId/events/published", [authenticate], event.findAll);
    router.get(
      "/:eventSessionId/events",
      [authenticate],
      event.findAllForEventSession
    );

    
  
    // Retrieve a single Event with id
    router.get("/:eventSessionId/events/:id", [authenticate], event.findOne);
  
    // Update a Event with id
    router.put("/:eventSessionId/events/:id", [authenticate], event.update);
  
    // Delete a Event with id
    router.delete("/:eventSessionId/events/:id", [authenticate], event.delete);
  
    // Delete all Event
    router.delete("/:eventSessionId/events", [authenticate], event.deleteAll);
  
    app.use("/performance-t6/eventSessions", router);
  };
  