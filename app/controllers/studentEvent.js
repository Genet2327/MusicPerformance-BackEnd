const db = require("../models");
const Event = db.event;
const User = db.user;
const Avalability = db.avalability;
const Op = db.Sequelize.Op;

exports.findAllAvalabilityUserByEventId = (req, res) => {
  const eventId = req.params.eventId;
  User.findAll({
    include: [
      {
        model: Avalability,
        as: "avalability",
        where: {
          eventId: eventId,
        },
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while findAllAvalability people.",
      });
    });
};

exports.findAllAvalabilityEven = (req, res) => {
  Event.findAll({
    include: [
      {
        model: Avalability,
        as: "avalability",
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while findAllAvalability people.",
      });
    });
};
