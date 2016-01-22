const express = require('express');
const jsonParser = require('body-parser').json();
const Playlist = require(__dirname + '/../models/playlist');
const handleDBError = require(__dirname + '/../lib/handle_db_error');

var playlistRouter = module.exports = exports = express.Router();

playlistRouter.get('/playlists', (req, res) => {
  Playlist.find({}, (err, data) => {
    if (err) return handleDBError(err, res);

    res.status(200).json(data);
  });
});

playlistRouter.post('/playlists', jsonParser, (req, res) => {
  var newPlaylist = new Playlist(req.body);
  newPlaylist.save((err, data) => {
    if (err) return handleDBError(err, res);

    res.status(200).json(data);
  });
});

playlistRouter.put('/playlists/:id', jsonParser, (req, res) => {
  var playlistData = req.body;
  delete playlistData._id;
  Playlist.update({_id: req.params.id}, playlistData, (err) => {
    if (err) return handleDBError(err, res);

    res.status(200).json({msg: 'success'});
  });
});

playlistRouter.delete('/playlists/:id', (req, res) => {
  Playlist.remove({_id: req.params.id}, (err) => {
    if (err) return handleDBError(err, res);

    res.status(200).json({msg: 'success'});
  });
});
