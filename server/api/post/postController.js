const Models = require('../../../database/database-config');

module.exports = {
  addAPost: (req, res) => {
    Models.Post.build({
      phase: req.body.phase,
      title: req.body.title,
      message: req.body.message,
      sentiment: 0,
      flag: 0,
      anon: req.body.anon,
    }).save()
    .then(() => {
      res.status(201).send('Your post has been submitted!');
    })
    .catch((error) => {
      res.status(404).send(error);
    });
  },
  getAPost: (req, res) => {
    Models.Post.findById(req.params.id)
      .then((post) => {
        res.status(200).json(post);
      })
      .catch((error) => {
        res.send(error);
      });
  },
  getAllPosts: (req, res) => {
    Models.Post.findAll({
      where: {
        phase: req.params.phase,
      },
    })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.send(error);
    });
  },
  updateAPost: (req, res) => {
    Models.Post.update({
      title: req.body.title,
      message: req.body.message,
      anon: req.body.anon,
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
  deleteAPost: (req, res) => {
    Models.Post.destroy({
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
