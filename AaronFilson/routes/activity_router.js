const express = require('express');
const jsonParser = require('body-parser').json();
const Activity = require(__dirname + '/../models/activity');
const handleDBError = require(__dirname + '/../lib/handleDBError');
var activityRouter = module.exports = exports = express.Router();

activityRouter.get('/', (req, res) => {
  Activity.find({}, (err, data) => {
    if (err) return handleDBError(err, res);

    res.status(200).json(data);
  });
});

activityRouter.post('/', jsonParser, (req, res) => {
  var newActivity = new Activity(req.body);
  newActivity.save((err, data) => {
    if (err) return handleDBError(err, res);

    res.status(200).json(data);
  });
});

activityRouter.put('/:id', jsonParser, (req, res) => {
  var activityData = req.body;
  delete activityData._id;
  Activity.update({_id: req.params.id}, activityData, (err) => {
    if (err) return handleDBError(err, res);

    res.status(200).json({msg: 'success'});
  });
});

activityRouter.delete('/:id', (req, res) => {
  Activity.remove({_id: req.params.id}, (err) => {
    if (err) return handleDBError(err, res);

    res.status(200).json({msg: 'success'});
  });
});
