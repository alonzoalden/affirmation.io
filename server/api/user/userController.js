const Models = require('../../../database/database-config');

module.exports = {
  addAUser: (req, res) => {
    Models.User.build({
      name: req.body.name,
      avatar: req.body.avatar,
    }).save()
    .then((newUser) => {
      res.status(201).json(newUser);
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
      where: { id: req.body.id },
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
      where: { id: req.body.id },
    })
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => {
      res.send(error);
    });
  },
};
