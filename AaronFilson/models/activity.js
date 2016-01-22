const mongoose = require('mongoose');

var activitySchema = new mongoose.Schema({
  name: String,
  time: String,
  length: Number,
  solo: Boolean,
  gear: String,
  shoes: {type: String, default: 'running'}
});

module.exports = exports = mongoose.model('Activity', activitySchema);
