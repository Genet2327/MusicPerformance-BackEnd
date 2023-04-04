module.exports = (app) => {
    const critique = require("../controllers/critique.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Critique
    router.post("/", [authenticate], critique.create);
  
    // Retrieve all People
    router.get("/", [authenticate], critique.findAll);
  
    // Retrieve a single Critique with id
    router.get("/:id", [authenticate], critique.findOne);
  
    // Update a Critique with id
    router.put("/:id", [authenticate], critique.update);
  
    // Delete a Critique with id
    router.delete("/:id", [authenticate], critique.delete);
  
    // Delete all Critique
    router.delete("/", [authenticate], critique.deleteAll);
  
    app.use("/performance-t6/critique", router);
  };
  