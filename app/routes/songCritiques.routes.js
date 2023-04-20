module.exports = (app) => {
  const songCritiques = require("../controllers/songCritique");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();
  
  router.get("/bySongId/:songId", songCritiques.findAllBySongId);
  router.get("/bySongId/:songId/:userId", songCritiques.findOneBySongId);
  router.post("/", songCritiques.create);
  router.get("/", songCritiques.findAll);
  router.get("/:id", songCritiques.findOne);
  router.put("/:id", songCritiques.update);
  router.delete("/:id", songCritiques.delete);

  app.use("/performance-t6/songCritiques", router);
};
