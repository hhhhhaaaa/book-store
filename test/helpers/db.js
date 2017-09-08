const db = require('../../src/models/db/db');
const path = require('path');
const QueryFile = require('pg-promise').QueryFile;

function sql(file) {
  const fullPath = path.join(__dirname, file);
  return new QueryFile(fullPath);
}

const seedFiles = {
  books: sql('../seed/books.sql')
};

const resetDB = () => {
  const tables = ['book'];
  return Promise.all(tables.map((table) => {
    return db.none(`TRUNCATE ${table} RESTART IDENTITY`)
    .catch(error => {
      throw error;
    });
  }));
};

const seedDB = () => {
  return db.none(seedFiles.books)
  .catch(error => {
    throw error;
  });
};

const initDB = () => {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
    throw new Error('Incorrect Node Environment');
  } else if (process.env.NODE_ENV === 'test') {
    return resetDB()
      .then(() => {
        return seedDB();
      })
      .catch(error => {
        throw error;
      });
  } else {
    throw new Error('Unrecognized Node Environment');
  }
};

module.exports = {
  initDB
};
