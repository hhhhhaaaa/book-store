const chai = require('chai');
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest('http://localhost:3000');

describe('Testing Routes', function() {
  describe('GET', function() {
    it('Books should return a 200 response', function(done) {
      api.get('/books')
        .set('Accept', 'application/json')
        .expect(200, done);
    });
    it('New should return a 200 response', function(done) {
      api.get('/books/new')
        .set('Accept', 'application/json')
        .expect(200, done);
    });
  });
});
