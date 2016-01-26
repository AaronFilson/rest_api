const express = require('express');
const jsonParser = require('body-parser').json();
const Playlist = require(__dirname + '/../models/playlist');
const handleDBError = require(__dirname + '/../lib/handleDBError');

var playlistRouter = module.exports = exports = express.Router();

playlistRouter.get('/', (req, res) => {
  Playlist.find({}, (err, data) => {
    if (err) return handleDBError(err, res);

    res.status(200).json(data);
  });
});

playlistRouter.post('/', jsonParser, (req, res) => {
  var newPlaylist = new Playlist(req.body);
  newPlaylist.save((err, data) => {
    if (err) return handleDBError(err, res);

    res.status(200).json(data);
  });
});

playlistRouter.put('/:id', jsonParser, (req, res) => {
  var playlistData = req.body;
  delete playlistData._id;
  Playlist.update({_id: req.params.id}, playlistData, (err) => {
    if (err) return handleDBError(err, res);

    res.status(200).json({msg: 'success'});
  });
});

playlistRouter.delete('/:id', (req, res) => {
  Playlist.remove({_id: req.params.id}, (err) => {
    if (err) return handleDBError(err, res);

    res.status(200).json({msg: 'success'});
  });
});
