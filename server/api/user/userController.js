const Models = require('../../../database/database_config');

module.exports = {
  addAUser: (req, res) => {
    console.log('Adding User!');
    Models.User.build({
      email: req.body.email,
      name: req.body.name,
      avatar: req.body.avatar,
      job: req.body.job || 'Affirmation',
      location: req.body.location || 'Cyberspace',
      about: req.body.about || ':/',
    }).save()
    .then((newUser) => {
      console.log('Added user successfully');
      res.status(201).json(newUser);
    })
    .catch((error) => {
      console.log('Error adding user');
      res.send(error);
    });
  },
  getAUser: (req, res) => {
    let returnUser = {};
    console.log('getting a user ...');
    Models.User.findById(req.params.email)
    .then((user) => {
      // res.status(200).json(user);
      returnUser['user'] = user;
    })
    .then(() => {
      console.log('getting posts ...');
      Models.Post.findAll({
        where: { userEmail: req.params.email }
      })
      .then((posts) => {
        returnUser['posts'] = posts;
      })
      .catch((error) => {
        console.log('user posts error:', error);
      })
    })
    .then(() => {
      console.log('getting votes ...');
      Models.Sentiment.findAll({
        where: { userEmail: req.params.email }
      })
      .then((votes) => {
        returnUser['sentiments'] = votes;
      })
      .catch((error) => {
        console.log('user sentiments error:', error);
      })
    })
    .then(() => {
      console.log('getting favs ...');
      Models.Favorites.findAll({
        where: { userEmail: req.params.email }
      })
      .then((favs) => {
        returnUser['favorites'] = favs;
      })
      .catch((error) => {
        console.log('user favorites error:', error);
      })
    })
    .then(() => {
      console.log('getting flags ...');
      Models.Flags.findAll({
        where: { userEmail: req.params.email }
      })
      .then((flags) => {
        returnUser['flags'] = flags;
      })
      .then(() => {
        res.status(200).json(returnUser);
      })
      .catch((error) => {
        console.log('user flags error:', error);
      })
    })
    .catch((error) => {
      console.log(error);
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
