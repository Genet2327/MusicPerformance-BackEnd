module.exports = (app) => {
    const composer = require("../controllers/composer.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Composer
    router.post("/" , [authenticate],composer.create);
  
    // Retrieve all People
    router.get("/", [authenticate], composer.findAll);
  
    // Retrieve a single Composer with id
    router.get("/:id", [authenticate], composer.findOne);
  
    // Update a Composer with id
    router.put("/:id", [authenticate], composer.update);
  
    // Delete a Composer with id
    router.delete("/:id", [authenticate], composer.delete);
  
    // Delete all Composer
    router.delete("/", [authenticate], composer.deleteAll);
  
    app.use("/performance-t6/composers", router);
  };
  