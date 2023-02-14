module.exports = (app) => {
    const role = require("../controllers/role.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Critique
    router.post("/", [authenticate], role.create);
  
    // Retrieve all People
    router.get("/", [authenticate], role.findAll);
  
    // Retrieve a single Critique with id
    router.get("/:id", [authenticate], role.findOne);
  
    // Update a Critique with id
    router.put("/:id", [authenticate], role.update);
  
    // Delete a Critique with id
    router.delete("/:id", [authenticate], role.delete);
  
    // Delete all Critique
    router.delete("/", [authenticate], role.deleteAll);
  
    app.use("/performance-t6/role", router);
  };
  