module.exports = (app) => {
  const studentEvent = require("../controllers/studentEvent");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();
 
  router.get("/", studentEvent.findAllAvalabilityEven);
  router.get("/user/:eventId", studentEvent.findAllAvalabilityUserByEventId);

  app.use("/performance-t6/studentEvent", router);
};
