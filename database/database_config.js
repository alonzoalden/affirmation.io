const Sequelize = require('sequelize');

// #######################__Create Connection__##############################


const dbConnection = new Sequelize('app_data', '', '', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
});

// ########################__Define Models__###############################


const User = dbConnection.define('user', {
  id: { type: Sequelize.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
  name: { type: Sequelize.STRING, unique: true, validate: { notEmpty: true } },
  avatar: { type: Sequelize.STRING },
});

const Post = dbConnection.define('post', {
  id: { type: Sequelize.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
  title: { type: Sequelize.STRING(70), validate: { notEmpty: true } },
  message: { type: Sequelize.TEXT, validate: { notEmpty: true } },
  sentiment: { type: Sequelize.INTEGER, allowNull: false },
  flag: { type: Sequelize.INTEGER, allowNull: false },
  anon: { type: Sequelize.BOOLEAN, allowNull: false },
});