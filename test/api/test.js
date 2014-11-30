/*jshint node:true*/
'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);

require('../../server');

var expect = chai.expect;

describe('Simple json database', function() {
  it('should be able to create a new file', function(done) {
    chai.request('http://localhost:3000')
    .post('/new_fruit')
    .send({
      fruit: 'kiwi berry'
    })
    .end(function(err, res) {
      expect(err).to.be.eql(null);
      expect(res.body).to.be.eql({ fruit: 'kiwi berry' });
      done();
    });
  });
  it('should get response from request and post the object in the file', function(done) {
    chai.request('http://localhost:3000')
    .get('/new_fruit')
    .end(function(err, res) {
      console.log(res.body);
      expect(err).to.be.eql(null);
      expect(res.body).to.be.eql({ fruit: 'kiwi berry' });
      done();
    });
  });
});
