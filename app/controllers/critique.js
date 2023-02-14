const db = require("../models");
const Critique = db.critique;
const Op = db.Sequelize.Op;

// Create and Save a new Critique
exports.create = (req, res) => {
  // Validate request
  if (!req.body.fName) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Critique
  const critique = {
    id: req.body.id,
    tone: req.body.tone,
    accuracy: req.body.accuracy,
    technique: req.body.technique,
    interpretation: req.body.interpretation,
    balanceblend: req.body.balanceblend,
    
    // refresh_token: req.body.refresh_token,
    // expiration_date: req.body.expiration_date
  };

  // Save Critique in the database
  Critique.create(critique)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Critique.",
      });
    });
};

// Retrieve all People from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Critique.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving people.",
      });
    });
};

// Find a single Critique with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Critique.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Critique with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Critique with id=" + id,
      });
    });
};

// Find a single Critique with an email
exports.findByEmail = (req, res) => {
  const email = req.params.email;

  Critique.findOne({
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
          message: `Cannot find Critique with email=${email}.`
        });*/
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Critique with email=" + email,
      });
    });
};

// Update a Critique by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Critique.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Critique was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Critique with id=${id}. Maybe Critique was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Critique with id=" + id,
      });
    });
};

// Delete a Critique with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Critique.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Critique was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Critique with id=${id}. Maybe Critique was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Critique with id=" + id,
      });
    });
};

// Delete all People from the database.
exports.deleteAll = (req, res) => {
  Critique.destroy({
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
