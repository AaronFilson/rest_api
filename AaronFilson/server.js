const express = require('express');
const app = module.exports = exports = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/mix_dev');

const mixRouter = require(__dirname + '/routes/mixRouter');
const authRouter = require(__dirname + '/routes/auth_router');

//app.use('/api', mixRouter);
app.use('/api', authRouter);


var PORT = process.env.PORT || 3050;
app.listen(PORT, () => console.log('server up on port: ' + PORT));
