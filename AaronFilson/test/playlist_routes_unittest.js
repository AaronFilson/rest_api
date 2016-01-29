const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost/playlist_app_test';
const server = require(__dirname + '/../server');
const Playlist = require(__dirname + '/../models/playlist');

describe('the playlist api', () => {

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should be able to retrieve all our playlists', (done) => {
    chai.request('localhost:3050')
      .get('/api/playlist')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  it('should create a playlist with a POST', (done) => {
    chai.request('localhost:3050')
      .post('/api/playlist')
      .send({name: 'test playlist'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to.eql('test playlist');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  describe('rest requests that require a playlist already in db', () => {
    beforeEach((done) => {
      Playlist.create({name: 'test playlist'}, (err, data) => {
        this.testplaylist = data;
        done();
      });
    });

    it('should be able to update a playlist', (done) => {
      chai.request('localhost:3050')
        .put('/api/playlist/' + this.testplaylist._id)
        .send({name: 'new playlist name'})
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });

    it('should be able to delete a playlist', (done) => {
      chai.request('localhost:3050')
        .delete('/api/playlist/' + this.testplaylist._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });
  });
});
