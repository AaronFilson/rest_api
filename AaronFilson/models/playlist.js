const mongoose = require('mongoose');

var playlistSchema = new mongoose.Schema({
  name: String,
  genere: String,
  dj: String,
  beatPreference: {type: String, default: '90'}
});

module.exports = exports = mongoose.model('Playlist', playlistSchema);
