const db = require("../models");
const Avalability = db.avalability;
const Op = db.Sequelize.Op;

exports.findOneByEventIdandUserId = (req, res) => {
  const eventId = req.params.eventId;
  const userId = req.params.userId;

  Avalability.findOne({
    where: {
      eventId: eventId,
      userId: userId,
    },
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

exports.findAllEvents = (req, res) => {
  Avalability.findAll()
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

// Create and Save a new Avalability
exports.create = (req, res) => {
  var data = {
    eventId: req.body.eventId,
    userId: req.body.userId,
    isSelected: true
  };
  // Save Avalability in the database
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

// Retrieve all People from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Avalability.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving people.",
      });
    });
};

// Find a single Avalability with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Avalability.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Avalability with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Avalability with id=" + id,
      });
    });
};

// Find a single Avalability with an email
exports.findByEmail = (req, res) => {
  const email = req.params.email;

  Avalability.findOne({
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
          message: `Cannot find Avalability with email=${email}.`
        });*/
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Avalability with email=" + email,
      });
    });
};

// Update a Avalability by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Avalability.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Avalability was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Avalability with id=${id}. Maybe Avalability was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Avalability with id=" + id,
      });
    });
};

// Delete a Avalability with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Avalability.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Avalability was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Avalability with id=${id}. Maybe Avalability was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Avalability with id=" + id,
      });
    });
};

// Delete all People from the database.
exports.deleteAll = (req, res) => {
  Avalability.destroy({
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
