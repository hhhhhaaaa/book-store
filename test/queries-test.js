const chai = require('chai');
const expect = require('chai').expect;
const books = require('../src/models/books');

describe('Testing Queries', function() {
  describe('Add', function() {
    it('Should add a book to the database', function(done) {
      books.add({title: 'Harry Potter', author: 'J.K. Rowling', genre: 'Magic'})
      .then(newBook => {
        expect(newBook.title).to.eql('Harry Potter');
        expect(newBook.author).to.eql('J.K. Rowling');
        expect(newBook.genre).to.eql('Magic');
        done();
    });
    });
  });
  describe('GetAll', function() {
    it('Should add a book to the database', function(done) {
      books.add({title: 'Harry Potter', author: 'J.K. Rowling', genre: 'Magic'})
      .then(newBook => {
        expect(newBook.title).to.eql('Harry Potter');
        expect(newBook.author).to.eql('J.K. Rowling');
        expect(newBook.genre).to.eql('Magic');
        done();
    });
    });
  });
});
