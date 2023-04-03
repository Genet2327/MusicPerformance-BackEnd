module.exports = (app) => {
    const avalability = require("../controllers/avalability.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
     router.get("/user/:userId/event/:eventId", avalability.findOneByEventIdandUserId);

    // Create a new Event
    router.post("/", avalability.create);
  
    // Retrieve all People
    router.get("/", avalability.findAll);
  
    // Retrieve a single Event with id
    router.get("/:id", avalability.findOne);
  
    // Update a Event with id
    router.put("/:id", avalability.update);
  
    // Delete a Event with id
    router.delete("/:id", avalability.delete);
  
    // Delete all Event
    router.delete("/", avalability.deleteAll);
  
    app.use("/performance-t6/avalability", router);
  };
  