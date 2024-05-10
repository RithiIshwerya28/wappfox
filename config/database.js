const Sequelize = require('sequelize');

const config = {
  dialect: 'mssql',
  server: 'localhost',
  database: 'ImportTest',
  username: 'sa', // Replace 'your_username' with the actual username
  password: 'Abcd@1234$', // Replace 'your_password' with the actual password
  options: {
    trustedConnection: false // Set trustedConnection to false when using SQL Server Authentication
  }
};

module.exports = new Sequelize(config.database, config.username, config.password, config);
