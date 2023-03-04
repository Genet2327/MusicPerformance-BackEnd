const db = require("../models");
const EventSessions = db.eventSessions;
const Op = db.Sequelize.Op;

// Create and Save a new EventSessions
exports.create = (req, res) => {
  // Validate request
  if (!req.body.type) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a EventSessions
  const eventSessions = {
    id: req.body.id,
    type: req.body.type,
    durationSession: req.body.durationSession,
    
   
    
    // refresh_token: req.body.refresh_token,
    // expiration_date: req.body.expiration_date
  };

  // Save EventSessions in the database
  EventSessions.create(eventSessions)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the EventSessions.",
      });
    });
};

// Retrieve all People from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  EventSessions.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving people.",
      });
    });
};

// Find a single EventSessions with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  EventSessions.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find EventSessions with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving EventSessions with id=" + id,
      });
    });
};

// Find a single EventSessions with an email
exports.findByEmail = (req, res) => {
  const email = req.params.email;

  EventSessions.findOne({
    where: {
      email: email,
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.send({ email: "not found" });
        /*res.status(404).send({
          message: `Cannot find EventSessions with email=${email}.`
        });*/
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving EventSessions with email=" + email,
      });
    });
};

// Update a EventSessions by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  EventSessions.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "EventSessions was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update EventSessions with id=${id}. Maybe EventSessions was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating EventSessions with id=" + id,
      });
    });
};

// Delete a EventSessions with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  EventSessions.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "EventSessions was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete EventSessions with id=${id}. Maybe EventSessions was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete EventSessions with id=" + id,
      });
    });
};

// Delete all People from the database.
exports.deleteAll = (req, res) => {
  EventSessions.destroy({
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
