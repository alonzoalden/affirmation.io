const path = require('path');
const userController = require('./api/user/userController');
const postController = require('./api/post/postController');

module.exports = function (app, express) {

  //initiatie express router
  const router = express.Router();

  //these are the api endpoints and routes
  router.route('/posts/:phase/')
    .post(postController.addAPost)
    .get(postController.getAllPosts);

  router.route('/posts/:phase/:id')
    .get(postController.getAPost)
    .put(postController.updateAPost)
    .delete(postController.deleteAPost);

  router.route('/users/')
    .post(userController.addAUser)
    .get(userController.getAllUsers);

  router.route('/users/:id')
    .get(userController.addAUser)
    .put(userController.updateAUser)
    .delete(userController.deleteAUser);

app.use('/api', router);

  //need to add this to handle direct addressing of routes.
  //will serve index.html which has our js linked for routing.
  app.get('*', function (request, response){
    response.sendFile(path.join(__dirname, '../public/index.html'));
  });
};
