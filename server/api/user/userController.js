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
    let returnUser = {};
    Models.User.findById(req.params.email)
    .then((user) => {
      returnUser['user'] = user;
    })
    .then(() => {
      Models.Post.findAll({
        where: { userEmail: req.params.email }
      })
      .then((posts) => {
        returnUser['posts'] = posts;
      })
      .then(() => {
        Models.Sentiment.findAll({
          where: { userEmail: req.params.email }
        })
        .then((votes) => {
          returnUser['sentiments'] = votes;
        })
        .then(() => {
          Models.Favorites.findAll({
            where: { userEmail: req.params.email }
          })
          .then((favs) => {
            returnUser['favorites'] = favs;
          })
          .then(() => {
            Models.Flags.findAll({
              where: { userEmail: req.params.email }
            })
            .then((flags) => {
              returnUser['flags'] = flags;
            })
            .then(() => {
              res.status(200).json(returnUser);
            })
          })
        })
      })
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
      job: req.body.job,
      location: req.body.location,
      about: req.body.about,
    }, {
      where: { email: req.params.email },
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
      where: { email: req.params.email },
    })
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => {
      res.send(error);
    });
  },
};
