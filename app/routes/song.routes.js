module.exports = (app) => {
  const song = require("../controllers/song.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();
  
  router.get("/allsong/:id", song.findAllSongByUserId);
  router.get("/signUpId/:id", song.findAllBySignUpId);
  router.get("/allByUserId/:id", song.findAllByUserId);

  router.post("/", song.create);

  router.get("/", song.findAll);

  router.get("/:id", song.findOne);

  router.put("/:id", song.update);

  router.delete("/:id", song.delete);

  //router.get("/findAllNullSignUP", song.findAllNullSignUP);

  app.use("/performance-t6/songs", router);
};
