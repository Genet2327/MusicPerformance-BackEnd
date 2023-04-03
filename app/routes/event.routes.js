module.exports = (app) => {
  const event = require("../controllers/event.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();
  // Create a new Event
  router.post("/:eventSessionId/events", event.create);
  // Create a new Event
  router.post("/user/", event.addandRemoveAvalability);

  router.get("/events", event.findAllAvalability);
  router.get("/avalablity/:id", event.AvalabilityByUserId);
  router.delete("/avalablity/:userId/:id", event.deleteAvalability);
  

  router.get("/:eventSessionId/events", event.findAllForEventSession);

  // Retrieve a single Event with id
  router.get("/:eventSessionId/events/:id", event.findOne);

  // Update a Event with id
  router.put("/:eventSessionId/events/:id", event.update);

  router.put("/events/:id", event.update);

  // Delete a Event with id
  router.delete("/:eventSessionId/events/:id", event.delete);

  // Delete all Event
  router.delete("/:eventSessionId/events", event.deleteAll);

  app.use("/performance-t6/eventSessions", router);
};
