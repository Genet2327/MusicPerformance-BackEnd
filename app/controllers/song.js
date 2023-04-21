const db = require("../models");
const Song = db.song;
const Composer = db.composer;
const SignUp = db.signUp;
const Op = db.Sequelize.Op;

exports.findAllSongByUserId = (req, res) => {
  const userId = req.params.id;
  return Song.findAll({
    include: [
      {
        model: SignUp,
        as: "signUp",
        where: {
          userId: userId,
        },
      },
      {
        model: Composer,
        as: "composer",
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the AvalabilityByUserId.",
      });
    });
};



exports.findAllBySignUpId = (req, res) => {
  const id = req.params.id;

  Song.findAll({
    include: [
      {
        model: Composer,
        as: "composer",
      },
    ],
    where: {
      signUpId: id,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while signUpId people.",
      });
    });
};

// Create and Save a new Song
exports.create = (req, res) => {
  // Validate request

  // Create a Song
  const song = {
    id: req.body.id,
    title: req.body.title,
    language: req.body.language,
    translationSong: req.body.translationSong,
    composerId: req.body.composerId,
    lyrics: req.body.lyrics,
    signUpId: req.body.signUpId,
  };

  // Save Song in the database
  Song.create(song)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Song.",
      });
    });
};
exports.findAllByUserId = (req, res) => {
  const userId = req.params.id;
  return Song.findAll({
    include: [
      {
        model: Composer,
        as: "composer",
      },
    ],
    where: {
      userId: userId,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the AvalabilityByUserId.",
      });
    });
};

exports.findAll = (req, res) => {
  Song.findAll({
    include: [
      {
        model: Composer,
        as: "composer",
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

// Find a single Song with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Song.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Song with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Song with id=" + id,
      });
    });
};

// Update a Song by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Song.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Song was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Song with id=${id}. Maybe Song was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Song with id=" + id,
      });
    });
};

// Delete a Song with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Song.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Song was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Song with id=${id}. Maybe Song was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Song with id=" + id,
      });
    });
};

// Delete all People from the database.
exports.deleteAll = (req, res) => {
  Song.destroy({
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
