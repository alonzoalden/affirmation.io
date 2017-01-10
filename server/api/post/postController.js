const Models = require('../../../database/database_config');

module.exports = {
  addAPost: (req, res) => {
    Models.Post.build({
      phase: req.params.phase,
      title: req.body.title,
      message: req.body.message,
      sentiment: 0,
      helpful: 0,
      unhelpful: 0,
      flag: 0,
      favorites: 0,
      anon: req.body.anon,
      edited: false,
      userEmail: req.body.userEmail
    }).save()
    .then(() => {
      res.status(201).send('Your post has been submitted!');
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send(error);
    });
  },
  getAPost: (req, res) => {
    Models.Post.findAll({
      include: [Models.User],
      where: {
        id: req.params.id
      },
    })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.send(error);
    });
  },
  getAllPosts: (req, res) => {
    console.log('req.params:', req.params);
    Models.Post.findAll({
      include: [Models.User],
      where: {
        phase: req.params.phase,
      },
    })
    .then((posts) => {
      console.log('posts:', posts);
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log('Error:', error);
      res.send(error);
    });
  },
  updateAPost: (req, res) => {
    Models.Post.update({
      title: req.body.title,
      phase: req.body.phase,
      message: req.body.message,
      anon: req.body.anon,
      edited: true
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
  deleteAPost: (req, res) => {
    Models.Post.destroy({
      where: { id: req.params.id },
    })
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => {
      res.send(error);
    });
  },
  setHelpfulness: (req, res) => {
    if (req.params.vote === 'helpful') { // Vote must be accounted for, send in user email
      Models.Sentiment.build({
        helpfulness: true,
        userEmail: req.body.userEmail,
        postId: req.params.id,
      }).save()
      .then(() => {
        Models.Post.update({ // req.body.Helpful should be sent in as current count + 1
          helpful: req.body.helpful
        }, {
          where: { id: req.params.id }
        })
        .then(() => {
          res.status(201).send('Your upvote has been recorded!');
        })
      })
      .catch((error) => {
        console.log(error);
        res.status(404).send(error);
      });
    } else { // an unhelpful vote ------>
      Models.Sentiment.build({
        helpfulness: false,
        userEmail: req.body.email,
        postId: req.params.id,
      }).save()
      .then(() => {
        Models.Post.update({
          unhelpful: req.body.unhelpful + 1
        }, {
          where: { id: req.params.id }
        })
        .then(() => {
          res.status(201).send('Your downvote has been recorded!');
        })
      })
      .catch((error) => {
        console.log(error);
        res.status(404).send(error);
      });
    }
  },
  favoriteAPost: (req, res) => { // send in req.body.favorites as the NEW, incremented count
    Models.Favorites.build({
      favorite: true,
      userEmail: req.body.email,
      postId: req.params.id,
    }).save()
    .then(() => {
      Models.Post.update({
        favorites: req.body.favorites
      }, {
        where: { id: req.params.id }
      })
      .then(() => {
        res.status(201).send('Your favorite has been recorded!');
      })
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send(error);
    });
  },
  flagAPost: (req, res) => {
    Models.Flags.build({
      flag: true,
      userEmail: req.body.email,
      postId: req.params.id,
    }).save()
    .then(() => {
      Models.Post.update({
        flag: req.body.flag + 1
      }, {
        where: { id: req.params.id }
      })
      .then(() => {
        res.status(201).send('Your flag has been recorded!');
      })
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send(error);
    });
  },
  updateHelpfulness: (req, res) => { // helpfullness property will be the new value for helpful/unhelpful
    Models.Sentiment.update({
      helpfulness: req.body.helpfulness
    }, {
      where: { id: req.body.id }, // EMAIL ??
    })
    .then(() => {
      Models.Post.update({ // send addTo properties with requests according to what should be incremented && how
        helpful: req.body.helpful + req.body.addToHelpful,
        unhelpful: req.body.unhelpful + req.body.addToUnhelpful
      }, {
        where: { id: req.params.id }
      })
      .then(() => {
        res.status(204).end();
      })
    })
    .catch((error) => {
      res.send(error);
    });
  },
  updateFavoriteAPost: (req, res) => { // favorite property comes in as the NEW value
    Models.Favorites.update({
      favorite: req.body.favorite
    }, {
      where: { id: req.body.id }, // EMAIL ??
    })
    .then(() => {
      Models.Post.update({
        favorites: req.body.favorites + (req.body.favorite ? 1 : -1),
      }, {
        where: { id: req.params.id }
      })
      .then(() => {
        res.status(204).end();
      })
    })
    .catch((error) => {
      res.send(error);
    });
  },
  updateFlagAPost: (req, res) => {
    Models.Flags.update({
      flag: req.body.flag
    }, {
      where: { id: req.body.id }, // EMAIL ??
    })
    .then(() => {
      Models.Post.update({
        flag: req.body.flags + (req.body.flag ? 1 : -1),
      }, {
        where: { id: req.params.id }
      })
      .then(() => {
        res.status(204).end();
      })
    })
    .catch((error) => {
      res.send(error);
    });
  },
};
