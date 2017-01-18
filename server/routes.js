const path = require('path');
const userController = require('./api/user/userController');
const postController = require('./api/post/postController');

module.exports = function (app, express) {

  //initiatie express router
  const router = express.Router();

  //these are the api endpoints and routes
  router.route('/allposts')
    .get(postController.getEveryPost);

  router.route('/posts/:phase')
    .post(postController.addAPost)
    .get(postController.getAllPosts);

  router.route('/posts/:phase/:id/:email')
    .get(postController.getAPost)
    .put(postController.updateAPost)
    .delete(postController.deleteAPost);

  router.route('/posts/:phase/:id/vote/:vote')
    .post(postController.setHelpfulness)
    .put(postController.updateHelpfulness);

  router.route('/posts/:phase/:id/favorite/:favorite')
    .post(postController.favoriteAPost)
    .put(postController.removeFavorite)
    .get(postController.getAllFavorites);

  router.route('/posts/:phase/:id/flag/:flag')
    .post(postController.flagAPost)
    .put(postController.removeFlag);

  router.route('/users')
    .post(userController.addAUser)
    .get(userController.getAllUsers);

  router.route('/users/:email')
    .get(userController.getAUser)
    .put(userController.updateAUser)
    .delete(userController.deleteAUser);

  app.use('/api', router);

  //need to add this to handle direct addressing of routes.
  //will serve index.html which has our js linked for routing.
  if (process.env.NODE_ENV === 'production') {
    app.get('/*', function (request, response){
      response.sendFile(path.join(__dirname,'../build', 'index.html'));
    });
  } else {
    app.get('/*', function (request, response){
    response.sendFile(path.join(__dirname,'../public', 'index.html'));
    });
  }
};
