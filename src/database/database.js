const { Sequelize } = require('sequelize');
require('dotenv').config();

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.db = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
        }
      }
    );
  }
}

module.exports = new Database();