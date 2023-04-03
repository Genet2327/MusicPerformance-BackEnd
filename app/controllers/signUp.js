const db = require("../models");
const SignUp = db.signUp;
const Op = db.Sequelize.Op;

// Create and Save a new SignUp
exports.create = (req, res) => {
  // Validate request
  

  // Create a SignUp
  const signUp = {
    id: req.body.id,
    userId: req.body.userId,
    eventId: req.body.eventId,
   
    
    // refresh_token: req.body.refresh_token,
    // expiration_date: req.body.expiration_date
  };

  // Save SignUp in the database
  SignUp.create(signUp)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the SignUp.",
      });
    });
};

// Retrieve all People from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  SignUp.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving people.",
      });
    });
};

// Find a single SignUp with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  SignUp.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find SignUp with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving SignUp with id=" + id,
      });
    });
};

// Find a single SignUp with an email
exports.findByEmail = (req, res) => {
  const email = req.params.email;

  SignUp.findOne({
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
          message: `Cannot find SignUp with email=${email}.`
        });*/
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving SignUp with email=" + email,
      });
    });
};

// Update a SignUp by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  SignUp.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "SignUp was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update SignUp with id=${id}. Maybe SignUp was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating SignUp with id=" + id,
      });
    });
};

// Delete a SignUp with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  SignUp.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "SignUp was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete SignUp with id=${id}. Maybe SignUp was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete SignUp with id=" + id,
      });
    });
};

// Delete all People from the database.
exports.deleteAll = (req, res) => {
  SignUp.destroy({
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
