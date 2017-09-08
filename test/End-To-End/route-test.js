const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../../src/server');
const api = chai.request(app);
const dbHelper = require('../helpers/db');

describe('Testing Routes', function() {
  before('Reset the Database', () => {
     return dbHelper.initDB();
  });
  describe('GET', function() {
    it('Books should return a 200 response', function(done) {
      api.get('/books')
      .end(function(error, response) {
        console.log(response);
        console.log(error);
        expect(response).to.have.status(200);
        done();
      });
    });
    it('New should return a 200 response', function(done) {
      api.get('/books/new')
      .end((error, response) => {
        console.log(error);
        expect(response).to.have.status(200);
        done();
      });
    });
    it('BookId should return a 200 response', function(done) {
      api.get('/books/5')
      .end((error, response) => {
        console.log(error);
        expect(response).to.have.status(200);
        done();
      });
    });
    it('Search should return a 200 response', function(done) {
      api.get('/books/search?searchTerms=')
      .end((error, response) => {
        console.log(error);
        expect(response).to.have.status(200);
        done();
      });
    });
    it('/ should redirect to Books', function(done) {
      api.get('/')
      .end(function(error, response) {
        console.log(error);
        expect(response.redirects[0]).to.eql("http://http://127.0.0.1:3000/books");
        done();
      });
    });
  });
  describe('POST', function() {
  });
});
