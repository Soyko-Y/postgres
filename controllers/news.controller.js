const db = require('../models');

const News = db.news;
const { Op } = db.Sequelize;

// Create and Save a new News
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  // Create a News
  const news = {
    title: req.body.title,
    body: req.body.body,
    isViewed: false,
  };

  // Save News in the database
  News.create(news)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the News.',
      });
    });
};

// Retrieve all News from the database.
exports.findAll = (req, res) => {
  const { title } = req.query;
  const condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  News.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving news.',
      });
    });
};

// Find a single News with an id
exports.findOne = (req, res) => {
  const { id } = req.params;

  News.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving News with id=${id}`,
      });
    });
};

// Update a News by the id in the request
exports.update = (req, res) => {
  const { id } = req.params;

  News.update(req.body, {
    where: { id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'News was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update News with id=${id}. Maybe News was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating News with id=${id}`,
      });
    });
};

// Delete a News with the specified id in the request
exports.delete = (req, res) => {
  const { id } = req.params;

  News.destroy({
    where: { id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'News was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete News with id=${id}. Maybe News was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete News with id=${id}`,
      });
    });
};

// Delete all News from the database.
exports.deleteAll = (req, res) => {
  News.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} News were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all news.',
      });
    });
};

// Find all published News
exports.findAllPublished = (req, res) => {
  News.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving news.',
      });
    });
};
