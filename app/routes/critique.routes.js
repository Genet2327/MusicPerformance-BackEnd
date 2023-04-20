module.exports = (app) => {
  const critique = require("../controllers/critique.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

 
 router.get("/events/:id", critique.findAllEvents);
  router.post("/", critique.create);
  router.get("/", critique.findAll);
  router.get("/:id", critique.findOne);
  router.put("/:id", critique.update);
  router.delete("/:id", critique.delete);
  router.delete("/", critique.deleteAll);

  app.use("/performance-t6/critique", router);
};
