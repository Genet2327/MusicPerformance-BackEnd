module.exports = (app) => {
    const repertoire = require("../controllers/repertoire.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Event
    router.post("/", [authenticate], repertoire.create);
  
    // Retrieve all People
    router.get("/", [authenticate], repertoire.findAll);
  
    // Retrieve a single Event with id
    router.get("/:id", [authenticate], repertoire.findOne);
  
    // Update a Event with id
    router.put("/:id", [authenticate], repertoire.update);
  
    // Delete a Event with id
    router.delete("/:id", [authenticate], repertoire.delete);
  
    // Delete all Event
    router.delete("/", [authenticate], repertoire.deleteAll);
  
    app.use("/performance-t6/repertoire", router);
  };
  