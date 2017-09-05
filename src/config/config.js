module.exports = (function() {
  let config = {};

  const getEnv = () => {
    return process.env.NODE_ENV;
  };

  const makeConfig = () => {
    if (getEnv() === 'development') {
      console.log("Entering Development.");
      require('dotenv').config({path: __dirname + '/../../.env'});
    }

    config = {
      db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        name: process.env.DB_NAME
      },
      port: process.env.PORT
    };
    return config;
  };

  const getConfig = () => {
    return config;
  };

  makeConfig();

  return {
    getEnv,
    getConfig
  };
})();
