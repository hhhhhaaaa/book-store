const db = require('./db');

const add = (accountInfo) => {
  return db.oneOrNone(`
    INSERT INTO account
      (title, author, genre)
    VALUES
      ($1, $2, $3)
    RETURNING
      *
      `, [accountInfo.title, accountInfo.author, accountInfo.genre])
    .catch(error => {
      console.error({
        message: 'add query failed',
        error: error.stack,
        arguments: [accountInfo]
      });
      throw error;
    });
};

const getAll = () => {
  return db.query(`SELECT * FROM account ORDER BY id`)
    .catch(error => {
      console.error({
        message: 'getAll query failed',
        error: error.stack
      });
      throw error;
    });
};

const getById = (id) => {
  return db.oneOrNone(`SELECT * FROM account WHERE id=$1`, id)
    .catch(error => {
      console.error({
        message: 'getById query failed',
        error: error.stack,
        arguments: [id]
      });
      throw error;
    });
};

const update = (id, newAccountInfo) => {
  return db.oneOrNone(`
    UPDATE
      account
    SET
      title=$2, author=$3, genre=$4
    WHERE id=$1
    RETURNING
    *
    `, [id, newAccountInfo.title, newAccountInfo.author, newAccountInfo.genre])
    .catch(error => {
      console.error({
        message: 'update query failed',
        error: error.stack,
        arguments: [id, newAccountInfo]
      });
      throw error;
    });
};

const deleteById = (id) => {
  return db.query(`DELETE FROM account WHERE id=$1`, id)
    .catch(error => {
      console.error({
        message: 'deleteById query failed',
        error: error.stack,
        arguments: [id]
      });
      throw error;
    });
};

module.exports = {
  add,
  getAll,
  getById,
  update,
  deleteById,
  searchByColumn
};
