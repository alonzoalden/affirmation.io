const Models = require('../../../database/database_config');

module.exports = {
  addAUser: (req, res) => {
    Models.User.build({
      email: req.body.email,
      name: req.body.name,
      avatar: req.body.avatar,
      job: req.body.job || 'Affirmation',
      location: req.body.location || 'Cyberspace',
      about: req.body.about || ':/',
    }).save()
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch((error) => {
      res.send(error);
    });
  },
  getAUser: (req, res) => {
    Models.User.findById(req.params.email)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.send(error);
    });
  },
  getAllUsers: (req, res) => {
    Models.User.findAll({})
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.send(error);
    });
  },
  updateAUser: (req, res) => {
    Models.User.update({
      name: req.body.name,
      avatar: req.body.avatar,
    }, {
      where: { id: req.params.id },
    })
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => {
      res.send(error);
    });
  },
  deleteAUser: (req, res) => {
    Models.User.destroy({
      where: { id: req.params.id },
    })
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => {
      res.send(error);
    });
  },
};
