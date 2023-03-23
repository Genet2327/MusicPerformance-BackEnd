const db = require("../models");
const studentSignup = db.studentSignup;
const Op = db.Sequelize.Op;

// Create and Save a new studentSignup
exports.create = (req, res) => {
  // Validate request
  if (!req.body.fName) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a studentSignup
  const studentSignup = {
    id: req.body.id,
    level: req.body.level,
    major: req.body.major,
   
   
    
    // refresh_token: req.body.refresh_token,
    // expiration_date: req.body.expiration_date
  };

  // Save studentSignup in the database
  studentSignup.create(studentSignup)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the studentSignup.",
      });
    });
};

// Retrieve all People from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  studentSignup.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving people.",
      });
    });
};

// Find a single studentSignup with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  studentSignup.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find studentSignup with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving studentSignup with id=" + id,
      });
    });
};

// Find a single studentSignup with an email
exports.findByEmail = (req, res) => {
  const email = req.params.email;

  studentSignup.findOne({
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
          message: `Cannot find studentSignup with email=${email}.`
        });*/
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving studentSignup with email=" + email,
      });
    });
};

// Update a studentSignup by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  studentSignup.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "studentSignup was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update studentSignup with id=${id}. Maybe studentSignup was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating studentSignup with id=" + id,
      });
    });
};

// Delete a studentSignup with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  studentSignup.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "studentSignup was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete studentSignup with id=${id}. Maybe studentSignup was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete studentSignup with id=" + id,
      });
    });
};

// Delete all People from the database.
exports.deleteAll = (req, res) => {
  studentSignup.destroy({
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
