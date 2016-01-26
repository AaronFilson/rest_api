const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost/activity_app_test';
const server = require(__dirname + '/../server');
const Activity = require(__dirname + '/../models/activity');

describe('the activity api', () => {
  before((done) => {
    console.log("This is the before section, where we could do stuff if needed.");
    done();
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should be able to retrieve all our activities', (done) => {
    chai.request('localhost:3050')
      .get('/api/activity')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  it('should create a activity with a POST', (done) => {
    chai.request('localhost:3050')
      .post('/api/activity')
      .send({name: 'test activity'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to.eql('test activity');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  describe('rest requests that require a activity already in db', () => {
    beforeEach((done) => {
      Activity.create({name: 'test activity'}, (err, data) => {
        this.testactivity = data;
        done();
      });
    });

    it('should be able to update a activity', (done) => {
      chai.request('localhost:3050')
        .put('/api/activity/' + this.testactivity._id)
        .send({name: 'new activity name'})
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });

    it('should be able to delete a activity', (done) => {
      chai.request('localhost:3050')
        .delete('/api/activity/' + this.testactivity._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });
  });
});
