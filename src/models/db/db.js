const pgp = require('pg-promise')();
const config = require('../../config/config').getConfig();

const connectionObject = {
  host: config.db.host,
  port: config.db.port,
  database: config.db.name,
};

const db = pgp(connectionObject);

// Look into db.connect / Make sure it's necessary
db.connect()
  .then(connectionInformation => {
    console.log("Connected to DB");
    connectionInformation.done();
  })
  .catch(error => {
    console.error({message: 'Failed to connect to DB',
                   error: error.stack});
    throw error;
  });

module.exports = db;
