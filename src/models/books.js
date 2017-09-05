const db = require('./db/books');

const add = (bookInfo) => {
  return db.add(bookInfo);
};

const getAll = () => {
  return db.getAll();
};

const getById = (bookInfo) => {
  return db.getById(bookInfo);
};

const update = (id, newBookInfo) => {
  return db.update(id, newBookInfo);
};

const deleteById = (id) => {
  return db.deleteById(id);
};

const search = (bookInfo) => {
  return db.searchByColumn(bookInfo);
};

module.exports = {
  add,
  getAll,
  getById,
  update,
  deleteById,
  search
};
