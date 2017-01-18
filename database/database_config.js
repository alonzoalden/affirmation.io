const Sequelize = require('sequelize');

// #######################__Create Connection__##############################
console.log(process.env.NODE_ENV);

  const dbConnection = process.env.NODE_ENV === 'production' ? new Sequelize(process.env.DATABASE_URL) : new Sequelize('app_data', 'enduser', '', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
  });

// ########################__Define Models__###############################


const User = dbConnection.define('user', {
  email: { type: Sequelize.STRING, primaryKey: true, unique: true },
  name: { type: Sequelize.STRING, validate: { notEmpty: true } },
  avatar: { type: Sequelize.STRING },
  job: { type: Sequelize.STRING },
  location: { type: Sequelize.STRING },
  about: { type: Sequelize.TEXT },
});

const Post = dbConnection.define('post', {
  id: { type: Sequelize.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
  phase: { type: Sequelize.STRING(15), validate: { notEmpty: true } },
  title: { type: Sequelize.STRING(70), validate: { notEmpty: true } },
  message: { type: Sequelize.TEXT, validate: { notEmpty: true } },
  sentiment: { type: Sequelize.INTEGER, allowNull: false },
  helpful: { type: Sequelize.INTEGER, allowNull: false },
  unhelpful: { type: Sequelize.INTEGER, allowNull: false },
  flag: { type: Sequelize.INTEGER, allowNull: false },
  favorites: { type: Sequelize.INTEGER, allowNull: false },
  anon: { type: Sequelize.BOOLEAN, allowNull: false },
  edited: { type: Sequelize.BOOLEAN, allowNull: false },
});

const Sentiment = dbConnection.define('sentiment', {
  id: { type: Sequelize.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
  helpfulness: { type: Sequelize.BOOLEAN, allowNull: true, validate: { notEmpty: true } },
});
const Favorites = dbConnection.define('favorites', {
  id: { type: Sequelize.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
  favorite: { type: Sequelize.BOOLEAN, allowNull: true, validate: { notEmpty: true } },
});
const Flags = dbConnection.define('flags', {
  id: { type: Sequelize.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
  flag: { type: Sequelize.BOOLEAN, allowNull: true, validate: { notEmpty: true } },
});

// #######################__Define Associations__##############################

Post.belongsTo(User);
Sentiment.belongsTo(User);
Sentiment.belongsTo(Post);
Favorites.belongsTo(User);
Favorites.belongsTo(Post);
Flags.belongsTo(User);
Flags.belongsTo(Post);

// #######################__Sync Database and Export__##############################

dbConnection.sync();

module.exports = {
  connection: dbConnection,
  User,
  Post,
  Sentiment,
  Favorites,
  Flags
};
