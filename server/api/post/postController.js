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
    // console.log('req.params: ', req.params)
    let returnPost = {};
    Models.Post.findAll({
      include: [Models.User],
      where: {
        id: req.params.id
      },
    })
    .then((post) => {
      returnPost['post'] = post;
    })
    .then(() => {
      Models.Sentiment.findAll({
        where: {
          postId: req.params.id,
          userEmail: req.params.email
        },
      })
      .then((sentiment) => {
        returnPost['sentiment'] = sentiment;
      })
      .catch((error) => {
        console.log('sentiment error: ', error);
      })
    })
    .then(() => {
      Models.Favorites.findAll({
        where: {
          postId: req.params.id,
          userEmail: req.params.email
        },
      })
      .then((favorites) => {
        returnPost['favorites'] = favorites;
      })
      .catch((error) => {
        console.log('favorites error: ', error)
      })
    })
    .then(() => {
      Models.Flags.findAll({
        where: {
          postId: req.params.id,
          userEmail: req.params.email
        },
      })
      .then((flags) => {
        returnPost['flags'] = flags;
      })
      .then(() => {
        res.status(200).json(returnPost);
      })
      .catch((error) => {
        console.log('flags error: ', error)
      })
    })
    .catch((error) => {
      res.send(error);
    });
  },
  getAllPosts: (req, res) => {
    // console.log('req.params:', req.params);
    Models.Post.findAll({
      include: [Models.User],
      where: {
        phase: req.params.phase,
      },
    })
    .then((posts) => {
      // console.log('posts:', posts);
      res.status(200).json(posts);
    })
    .catch((error) => {
      // console.log('Error:', error);
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
        userEmail: req.body.email,
        postId: req.params.id,
      }).save()
      .then(() => {
        Models.Post.update({ // req.body.Helpful should be sent in as current count + 1, sentiment should be incremented
          helpful: req.body.helpful,
          sentiment: req.body.sentiment
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
        Models.Post.update({ // req.body.unhelpful should be sent in as current count + 1, req.body.sentiment should be decremented
          unhelpful: req.body.unhelpful,
          sentiment: req.body.sentiment
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
      Models.Post.update({ // send in req.body.flags as count = count + 1
        flag: req.body.flag
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
    if(req.params.vote === 'null') {
      Models.Sentiment.destroy({
        where: {
          postId: req.params.id,
          userEmail: req.body.email
        },
      })
      .then(() => {
        Models.Post.update({ // send addTo properties with requests according to what should be incremented && how
          helpful: req.body.helpful,
          unhelpful: req.body.unhelpful,
          sentiment: req.body.sentiment
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
    } else {
      Models.Sentiment.update({
        helpfulness: req.body.helpfulness
      }, {
        where: {
          postId: req.params.id,
          userEmail: req.body.email
        },
      })
      .then(() => {
        Models.Post.update({ // send addTo properties with requests according to what should be incremented && how
          helpful: req.body.helpful,
          unhelpful: req.body.unhelpful,
          sentiment: req.body.sentiment
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
    }
  },
  updateFavoriteAPost: (req, res) => { // favorite property comes in as the NEW value
    Models.Favorites.update({
      favorite: req.body.favorite
    }, {
      where: {
        postId: req.params.id,
        userEmail: req.body.email
      },
    })
    .then(() => {
      Models.Post.update({
        favorites: req.body.favorites
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
      where: {
        postId: req.params.id,
        userEmail: req.body.email
      },
    })
    .then(() => {
      Models.Post.update({
        flag: req.body.flags
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
