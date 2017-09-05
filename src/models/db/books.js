const db = require('./db');

const add = (bookInfo) => {
  return db.oneOrNone(`
    INSERT INTO book
      (title, author, genre)
    VALUES
      ($1, $2, $3)
    RETURNING
      *
      `, [bookInfo.title, bookInfo.author, bookInfo.genre])
    .catch(error => {
      console.error({message: 'add query failed',
                     error: error.stack,
                     arguments: [bookInfo]});
      throw error
   });
};

const getAll = () => {
  return db.query(`SELECT * FROM book ORDER BY id`)
  .catch(error => {
    console.error({message: 'getAll query failed',
                   error: error.stack});
    throw error
 });
};

const getById = (id) => {
  return db.oneOrNone(`SELECT * FROM book WHERE id=$1`, id)
  .catch(error => {
    console.error({message: 'getById query failed',
                   error: error.stack,
                   arguments: [id]});
    throw error
 });
};

const update = (id, newBookInfo) => {
  return db.query(`
    UPDATE
      book
    SET
      title=$2, author=$3, genre=$4
    WHERE id=$1
    `,
    [id, newBookInfo.title, newBookInfo.author, newBookInfo.genre])
    .catch(error => {
      console.error({message: 'update query failed',
                     error: error.stack,
                     arguments: [id, newBookInfo]});
      throw error
   });
};

const deleteById = (id) => {
  return db.query(`DELETE FROM book WHERE id=$1`, id)
  .catch(error => {
    console.error({message: 'deleteById query failed',
                   error: error.stack,
                   arguments: [id]});
    throw error
 });
};

const searchByColumn = (bookInfo) => {
  const searchQuery = `%${bookInfo.toLowerCase().replace(/\s+/,'%')}%`;
  return db.query(`
    SELECT * FROM
      book
    WHERE
      lower(title)
    LIKE
      $1
    UNION
    SELECT * FROM
      book
    WHERE
      lower(author)
    LIKE
      $1
    UNION
    SELECT * FROM
      book
    WHERE
      lower(genre)
    LIKE
      $1
    ORDER BY
      id
    `,
  [searchQuery])
  .catch(error => {
    console.error({message: 'searchByColumn query failed',
                   error: error.stack,
                   arguments: [bookInfo]});
    throw error
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
