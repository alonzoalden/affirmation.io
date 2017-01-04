var morgan = require('morgan'); //<-- debugging
var bodyParser = require('body-parser');
var path = require('path');
var userController = require('./api/users/userController');
var postController = require('./api/posts/eventController');

module.exports = function (app, express) {
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());

  app.use(express.static(path.join(__dirname, '../client')));

  //initiatie express router
  var router = express.Router();

  //these are the api endpoints and routes.
  router.route('/posts/:phase/')
    .post(postController.addAPost)
    .get(postController.getAllPosts);

  router.route('/posts/:phase/:id')
    .get(postController.getAPost)
    .put(postController.updateAPost)
    .delete(postController.deleteAPost);

  router.route('/users')
    .post(userController.addAUser)
    .get(userController.getAllUsers)
    .put(userController.updateAUser)
    .delete(userController.deleteAUser);

  app.use('/api', router);

  //need to add this to handle direct addressing of routes.
  //will serve index.html which has our js linked for routing.
  app.get('*', function (request, response){
    response.sendFile(path.join(__dirname, '../public/index.html'));
  });
};
