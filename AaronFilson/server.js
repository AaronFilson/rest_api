const express = require('express');
const app = module.exports = exports = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/mix_dev');

const mixRouter = require(__dirname + '/routes/mixRouter');
const authRouter = require(__dirname + '/routes/auth_router');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authentication, token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use('/api', mixRouter);
app.use('/api', authRouter);

var PORT = process.env.PORT || 3050;
app.listen(PORT, () => console.log('server up on port: ' + PORT));
