const db = require("../models");
const Event = db.event;
const User = db.user;
const Avalability = db.avalability;
const SignUp = db.signUp;
const Op = db.Sequelize.Op;

exports.AvalabilityByUserId = (req, res) => {
  const userId = req.params.id;
  return User.findByPk(userId, {
    include: [
      {
        model: Event,
        as: "Events",
        attributes: ["id", "date", "room", "startTime", "endTime"],
        through: {
          attributes: [],
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
          err.message ||
          "Some error occurred while creating the AvalabilityByUserId.",
      });
    });
};

exports.addandRemoveAvalability = (req, res) => {
  var data = {
    eventId: req.body.eventId,
    userId: req.body.userId,
    isSelected: true,
  };
  Avalability.create(data)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Avalability.",
      });
    });
};

exports.findAllAvalability = (req, res) => {
  User.findAll({
    include: [
      {
        model: Event,
        as: "Events",
        attributes: ["id", "room", "startTime", "endTime"],
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

exports.findAvalabilityById = async (req, res) => {
  const id = req.params.id;
  var avalabilityEvents = [];
  let user = {};

  await User.findByPk(id)
    .then((data) => {
      if (data != null) {
        user = data.dataValues;
        data.getEvents().then((e) => {
          for (let i = 0; i < e.length; i++) {
            var array = e[i];

            console.log(array.dataValues.room.TO);
            // array.forEach((element) => {
            //   console.log(element);
            //   // avalabilityEvents.push(element.room);
            // });
          }
        });

        let userInfo = {
          email: user.email,
          fName: user.fName,
          lName: user.lName,
          userId: user.id,
          avalabilityEvents: avalabilityEvents,
        };
        console.log(userInfo);
        res.send(userInfo);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while findAllAvalability people.",
      });
    });
};

exports.deleteAvalability = (req, res) => {
  const id = req.params.id;
  Avalability.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "deleteAvalability was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete deleteAvalability with id=${id}. Maybe deleteAvalability was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete deleteAvalability with id=" + id,
      });
    });
};

// Create and Save a new Event
exports.create = (req, res) => {
  // Validate request
  if (!req.body.room) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Event
  const event = {
    id: req.body.id,
    eventSessionId: req.params.eventSessionId,
    date: req.body.date,
    room: req.body.room,
    startTime: req.body.startTime,
    endTime: req.body.endTime,

    // refresh_token: req.body.refresh_token,
    // expiration_date: req.body.expiration_date
  };

  // Save Event in the database
  Event.create(event)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Event.",
      });
    });
};

// Retrieve all People from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Event.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving people.",
      });
    });
};
exports.findAllForEventSession = (req, res) => {
  const eventSessionId = req.params.eventSessionId;

  Event.findAll(
    { where: { eventSessionId: eventSessionId } },
    {
      include: [
        {
          model: Avalability,
          as: "avalability",
        },
      ],
    }
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving lessons.",
      });
    });
};

// Find a single Event with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Event.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Event with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Event with id=" + id,
      });
    });
};
exports.findOneEvent = (req, res) => {
  const id = req.params.id;

  Event.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Event with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Event with id=" + id,
      });
    });
};
// Find a single Event with an email

// Update a Event by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Event.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Event was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Event with id=${id}. Maybe Event was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Event with id=" + id,
      });
    });
};

// Delete a Event with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Event.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Event was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Event with id=${id}. Maybe Event was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Event with id=" + id,
      });
    });
};

// Delete all People from the database.
exports.deleteAll = (req, res) => {
  Event.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} People were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all people.",
      });
    });
};

exports.findAllNullSignUP = (req, res) => {
  const id = req.params.id;
  Event.findAll({
    where: { eventSessionId: id, signUpId: null },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving people.",
      });
    });
};
exports.findAllNotNullSignUP = (req, res) => {
  const id = req.params.id;
  const userId = req.params.userId;
  Event.findAll({
    where: { eventSessionId: id,  signUpId: {
      [Op.not]: null,
    },
    
  },
  include: [
    {
      model: SignUp,
      as: "signUp",
      where: { userId: userId }
    },
  ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving people.",
      });
    });
};
