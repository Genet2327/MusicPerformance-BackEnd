const db = require("../models");
const SongCritiques = db.songCritiques;
const Critique = db.critique;
const User = db.user;
const Op = db.Sequelize.Op;

exports.findAllBySongId = (req, res) => {
  const songId = req.params.songId;
  SongCritiques.findAll({
    where: { songId: songId },
    include: [
      {
        model: Critique,
        as: "critique",
      },
      {
        model: User,
        as: "user",
      },
    ]
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

exports.findOneBySongId = (req, res) => {
  const songId = req.params.songId;
  const userId = req.params.userId;

  SongCritiques.findOne({
    where: { songId: songId, userId: userId },
    include: [
      {
        model: Critique,
        as: "critique",
      }
    ]
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

exports.create = (req, res) => {
  const songCritiques = {
    userId: req.body.userId,
    songId: req.body.songId,
    critiqueId: req.body.critiqueId,
  };
  SongCritiques.create(songCritiques)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the SongCritiques.",
      });
    });
};

exports.findAll = (req, res) => {
  SongCritiques.findAll()
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
  SongCritiques.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find SongCritiques with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving SongCritiques with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  SongCritiques.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "SongCritiques was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update SongCritiques with id=${id}. Maybe SongCritiques was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating SongCritiques with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  SongCritiques.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "SongCritiques was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete SongCritiques with id=${id}. Maybe SongCritiques was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete SongCritiques with id=" + id,
      });
    });
};
