module.exports = (app) => {
  const role = require("../controllers/role.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.get("/allAccompanist", role.findAllAccompanist);

  router.post("/", [authenticate], role.create);

  router.get("/", [authenticate], role.findAll);

  router.get("/:id", [authenticate], role.findOne);

  router.put("/:id", role.update);

  router.delete("/:id", [authenticate], role.delete);

  router.delete("/", [authenticate], role.deleteAll);

  app.use("/performance-t6/role", router);
};
