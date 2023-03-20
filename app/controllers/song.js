const db = require("../models");
const Song = db.song;
const Op = db.Sequelize.Op;

// Create and Save a new Song
exports.create = (req, res) => {
  // Validate request
 
  // Create a Song
  const song = {
    id: req.body.id,
    name: req.body.name,
    language: req.body.language,
    translationSong: req.body.translationSong,
    lyrics:req.body.lyrics,
   
    
    // refresh_token: req.body.refresh_token,
    // expiration_date: req.body.expiration_date
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

// Retrieve all People from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Song.findAll({ where: condition })
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

// Find a single Song with an email
exports.findByEmail = (req, res) => {
  const email = req.params.email;

  Song.findOne({
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
          message: `Cannot find Song with email=${email}.`
        });*/
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Song with email=" + email,
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
