const db = require('./db');

const add = (roleInfo) => {
  return db.oneOrNone(`
    INSERT INTO role
      (title, author, genre)
    VALUES
      ($1, $2, $3)
    RETURNING
      *
      `, [roleInfo.title, roleInfo.author, roleInfo.genre])
    .catch(error => {
      console.error({
        message: 'add query failed',
        error: error.stack,
        arguments: [roleInfo]
      });
      throw error;
    });
};

const getAll = () => {
  return db.query(`SELECT * FROM role ORDER BY id`)
    .catch(error => {
      console.error({
        message: 'getAll query failed',
        error: error.stack
      });
      throw error;
    });
};

const getById = (id) => {
  return db.oneOrNone(`SELECT * FROM role WHERE id=$1`, id)
    .catch(error => {
      console.error({
        message: 'getById query failed',
        error: error.stack,
        arguments: [id]
      });
      throw error;
    });
};

const update = (id, newRoleInfo) => {
  return db.oneOrNone(`
    UPDATE
      role
    SET
      title=$2, author=$3, genre=$4
    WHERE id=$1
    RETURNING
    *
    `, [id, newRoleInfo.title, newRoleInfo.author, newRoleInfo.genre])
    .catch(error => {
      console.error({
        message: 'update query failed',
        error: error.stack,
        arguments: [id, newRoleInfo]
      });
      throw error;
    });
};

const deleteById = (id) => {
  return db.query(`DELETE FROM role WHERE id=$1`, id)
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
