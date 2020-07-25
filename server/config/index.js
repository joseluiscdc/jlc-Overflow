require('dotenv').config();

const config = {
  secret: process.env.SECRET_JWT,
  dev: process.env.NODE_ENV !== 'prod',
  port: process.env.PORT || 3000,
  mongoUrl: process.env.URL_MONGO.toString(),
};

module.exports = { config }
