const chai = require('chai');
const expect = require('chai').expect;
const books = require('../../src/models/books');
const dbHelper = require('../helpers/db');

describe('Testing Queries', function() {
  before('Reset the Database', function() {
    return dbHelper.initDB();
  });
  describe('Add', function() {
    it('Should add a book to the database', function() {
      return books.add({
          title: 'Harry Potter',
          author: 'J.K. Rowling',
          genre: 'Magic'
        })
        .then(function(newBook) {
          expect(newBook.title).to.eql('Harry Potter');
          expect(newBook.author).to.eql('J.K. Rowling');
          expect(newBook.genre).to.eql('Magic');
        });
    });
  });
  describe('GetAll', function() {
    it('Should get all the books from the database', function() {
      return books.getAll()
        .then(function(books) {
          expect(books).to.eql([{
            id: 1,
            title: 'Lon Chaney: A Thousand Faces',
            author: 'Augy Echelle',
            genre: 'Documentary'
          }, {
            id: 2,
            title: 'Cool School, The',
            author: 'Gregory de Copeman',
            genre: 'Documentary'
          }, {
            id: 3,
            title: 'An Apology to Elephants',
            author: 'Quintin Graser',
            genre: 'Documentary'
          }, {
            id: 4,
            title: 'Halloween',
            author: 'Poppy Georghiou',
            genre: 'Horror'
          }, {
            id: 5,
            title: 'Harry Potter',
            author: 'J.K. Rowling',
            genre: 'Magic'
          }]);
        });
    });
  });
  describe('GetById', function() {
    it('Should get a single book from the database', function() {
      return books.getById(5, {
          title: 'Harry Potter',
          author: 'J.K. Rowling',
          genre: 'Magic'
        })
        .then(function(book) {
          expect(book).to.eql({
            id: 5,
            title: 'Harry Potter',
            author: 'J.K. Rowling',
            genre: 'Magic'
          });
        });
    });
  });
  describe('Update', function() {
    it('Should update a book from the database', function() {
      return books.update(5, {
          title: 'Harry Bother',
          author: 'J.K. Bird',
          genre: 'Math'
        })
        .then(function(updatedBook) {
          expect(updatedBook).to.eql({
            id: 5,
            title: 'Harry Bother',
            author: 'J.K. Bird',
            genre: 'Math'
          });
        });
    });
  });
  describe('searchByColumn', function() {
    it('Should through the database for a term and return the results', function() {
      return books.search("Harry")
        .then(function(matchingBooks) {
          expect(matchingBooks).to.eql([{
            id: 5,
            title: 'Harry Bother',
            author: 'J.K. Bird',
            genre: 'Math'
          }]);
        });
    });
  });
  describe('DeleteById', function() {
    it('Should delete a book from the database', function() {
      return books.deleteById(5)
        .then(function() {
          books.getById(5)
            .then(book => {
              expect(book).to.eql(null);
            });
        });
    });
  });
});
