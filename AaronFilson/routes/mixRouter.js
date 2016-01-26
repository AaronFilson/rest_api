const express = require('express');
const jsonParser = require('body-parser').json();
const Playlist = require(__dirname + '/../models/playlist');
const Activity = require(__dirname + '/../models/activity');

const handleDBError = require(__dirname + '/../lib/handleDBError');


var act_router = require(__dirname + '/activity_router.js');
var play_router = require(__dirname + '/playlist_router.js');


var mixRouter = module.exports = exports = express.Router();

mixRouter.use('/activity', act_router);

mixRouter.use('/playlist', play_router);

mixRouter.get('/mix', (req, res) => {
  Playlist.find({}, (err, data) => {
    if (err) return handleDBError(err, res);

    res.playData = data;
    Activity.find({}, (err, data) => {
      if (err) return handleDBError(err, res);

      res.status(200).json(res.playData + data);
    });
  });
});
