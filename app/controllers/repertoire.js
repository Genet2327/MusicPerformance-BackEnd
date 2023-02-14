const db = require("../models");
const Repertoire = db.repertoire;
const Op = db.Sequelize.Op;

// Create and Save a new Repertoire
exports.create = (req, res) => {
  // Validate request
  if (!req.body.fName) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Repertoire
  const repertoire = {
    id: req.body.id,
    
   
    
    // refresh_token: req.body.refresh_token,
    // expiration_date: req.body.expiration_date
  };

  // Save Repertoire in the database
  Repertoire.create(repertoire)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Repertoire.",
      });
    });
};

// Retrieve all People from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Repertoire.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving people.",
      });
    });
};

// Find a single Repertoire with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Repertoire.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Repertoire with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Repertoire with id=" + id,
      });
    });
};

// Find a single Repertoire with an email
exports.findByEmail = (req, res) => {
  const email = req.params.email;

  Repertoire.findOne({
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
          message: `Cannot find Repertoire with email=${email}.`
        });*/
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Repertoire with email=" + email,
      });
    });
};

// Update a Repertoire by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Repertoire.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Repertoire was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Repertoire with id=${id}. Maybe Repertoire was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Repertoire with id=" + id,
      });
    });
};

// Delete a Repertoire with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Repertoire.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Repertoire was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Repertoire with id=${id}. Maybe Repertoire was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Repertoire with id=" + id,
      });
    });
};

// Delete all People from the database.
exports.deleteAll = (req, res) => {
  Repertoire.destroy({
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
