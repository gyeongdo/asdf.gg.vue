const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  "development": {
    "username": "root",
    "password": "0000",
    "database": "jpa_new",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "0000",
    "database": "jpa_new",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": "0000",
    "database": "jpa_new",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
