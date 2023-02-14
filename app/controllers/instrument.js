const db = require("../models");
const Instrument = db.instrument;
const Op = db.Sequelize.Op;

// Create and Save a new Instrument
exports.create = (req, res) => {
  // Validate request
  if (!req.body.fName) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Instrument
  const instrument = {
    id: req.body.id,
    name: req.body.name,
   
   
    
    // refresh_token: req.body.refresh_token,
    // expiration_date: req.body.expiration_date
  };

  // Save Instrument in the database
  Instrument.create(instrument)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Instrument.",
      });
    });
};

// Retrieve all People from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Instrument.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving people.",
      });
    });
};

// Find a single Instrument with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Instrument.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Instrument with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Instrument with id=" + id,
      });
    });
};

// Find a single Instrument with an email
exports.findByEmail = (req, res) => {
  const email = req.params.email;

  Instrument.findOne({
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
          message: `Cannot find Instrument with email=${email}.`
        });*/
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Instrument with email=" + email,
      });
    });
};

// Update a Instrument by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Instrument.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Instrument was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Instrument with id=${id}. Maybe Instrument was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Instrument with id=" + id,
      });
    });
};

// Delete a Instrument with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Instrument.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Instrument was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Instrument with id=${id}. Maybe Instrument was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Instrument with id=" + id,
      });
    });
};

// Delete all People from the database.
exports.deleteAll = (req, res) => {
  Instrument.destroy({
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
