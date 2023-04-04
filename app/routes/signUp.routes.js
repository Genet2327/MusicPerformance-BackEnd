module.exports = (app) => {
    const signUp = require("../controllers/signUp.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Event
    router.post("/", signUp.create);
  
    // Retrieve all People
    router.get("/", signUp.findAll);
  
    // Retrieve a single Event with id
    router.get("/:id", signUp.findOne);
  
    // Update a Event with id
    router.put("/:id", signUp.update);
  
    // Delete a Event with id
    router.delete("/:id", signUp.delete);
  
    // Delete all Event
    router.delete("/", signUp.deleteAll);
  
    app.use("/performance-t6/signUp", router);
  };
  