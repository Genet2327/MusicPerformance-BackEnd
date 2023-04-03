const db = require("../models");
const UserEvent = db.userEvent;
const Op = db.Sequelize.Op;

// Create and Save a new UserEvent
exports.create = (req, res) => {
  // Validate request
  if (!req.body.fName) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a UserEvent
  const userEvent = {
    userId: req.body.userId,
    eventId: req.body.eventId,
   
    
    // refresh_token: req.body.refresh_token,
    // expiration_date: req.body.expiration_date
  };

  // Save UserEvent in the database
  UserEvent.create(userEvent)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the UserEvent.",
      });
    });
};

// Retrieve all People from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  UserEvent.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving people.",
      });
    });
};

// Find a single UserEvent with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  UserEvent.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find UserEvent with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving UserEvent with id=" + id,
      });
    });
};

// Find a single UserEvent with an email
exports.findByEmail = (req, res) => {
  const email = req.params.email;

  UserEvent.findOne({
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
          message: `Cannot find UserEvent with email=${email}.`
        });*/
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving UserEvent with email=" + email,
      });
    });
};

// Update a UserEvent by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  UserEvent.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "UserEvent was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update UserEvent with id=${id}. Maybe UserEvent was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating UserEvent with id=" + id,
      });
    });
};

// Delete a UserEvent with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  UserEvent.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "UserEvent was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete UserEvent with id=${id}. Maybe UserEvent was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete UserEvent with id=" + id,
      });
    });
};

// Delete all People from the database.
exports.deleteAll = (req, res) => {
  UserEvent.destroy({
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
