module.exports = (app) => {
    const song = require("../controllers/song.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Event
    router.post("/", [authenticate], song.create);
  
    // Retrieve all People
    router.get("/", [authenticate], song.findAll);
  
    // Retrieve a single Event with id
    router.get("/:id", [authenticate], song.findOne);
  
    // Update a Event with id
    router.put("/:id", [authenticate], song.update);
  
    // Delete a Event with id
    router.delete("/:id", [authenticate], song.delete);
  
    // Delete all Event
    router.delete("/", [authenticate], song.deleteAll);
  
    app.use("/performance-t6/songs", router);
  };
  