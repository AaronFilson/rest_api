const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost/user_app_test';
const server = require(__dirname + '/../server');
const Activity = require(__dirname + '/../models/activity');

var PORT = process.env.PORT || 3050;
var apploc = 'localhost:' + PORT;

describe('authentication module', () => {

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should be able to make a new user', (done) => {
    request(apploc)
      .post('/api/signup')
      .send('{"username":"test@test.com", "password":"1234"}')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body).to.not.eql(null);
        done();
      });
  });

  it('should log into new account', (done) => {
    request(apploc)
      .post('/api/signin')
      .set('username', 'test@test.com')
      .set('password', '1234')
      .end(function(err, res) {
        expect(err).to.eql(null);
        done();
      });
  });


});
