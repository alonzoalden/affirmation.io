const Sequelize = require('sequelize');

// #######################__Create Connection__##############################


const dbConnection = new Sequelize('app_data', '', '', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
});