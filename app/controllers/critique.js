const db = require("../models");
const Critique = db.critique;
const Event = db.event;
const SignUp = db.signUp;
const User = db.user;
const Op = db.Sequelize.Op;
exports.findAllEvents = (req, res) => {
  const id = req.params.id;

  Event.findAll({
    where: { eventSessionId: id },
    include: [
      {
        model: SignUp,
        as: "signUp",
        include: [
          {
            model: User,
            as: "user",
          },
        ],
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
// exports.findAllEvents = (req, res) => {
//   const eventSessionId = req.query.eventSessionId;
//   Event.findAll({
//     where: {
//       eventSessionId: eventSessionId,
//     },
//     include: [
//       {
//         model: SignUp,
//         as: "signUp",
//         include: [
//           {
//             model: User,
//             as: "user",
//           },
//         ],
//       },
//     ],
//   })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while events.",
//       });
//     });
// };

exports.create = (req, res) => {
  const critique = {
    id: req.body.id,
    tone: req.body.tone,
    accuracy: req.body.accuracy,
    technique: req.body.technique,
    interpretation: req.body.interpretation,
    balanceblend: req.body.balanceblend,
  };

  Critique.create(critique)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Critique.",
      });
    });
};

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
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Critique with email=" + email,
      });
    });
};

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
