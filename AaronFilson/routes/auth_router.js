const express = require('express');
const User = (__dirname + '/../models/user');
const jsonParser = require('body-parser').json;
const handleDBError = require(__dirname + '/../lib/handleDBError');
const basicHTTP = require(__dirname + '/../lib/basic_http');

var authRouter = module.exports = exports = express.Router();

authRouter.get('/signup', jsonParser, (req, res) => {
  console.log('in sign up route');
  var newUser = new User();
  if(!((req.body.email || '').length && (req.body.password || '').length > 7)){
    return res.status(401).json({msg: 'invalid username or password'});
  }

  newUser.username = req.body.username || req.body.email;
  newUser.authentication.email = req.body.email;
  newUser.hashPassword(req.body.password);
  newUser.save((err, data) => {
    if(err) return handleDBError(err, res);

    res.status(200).json({token: data.generateToken()});
  });
});

authRouter.get('/signin', basicHTTP, (req, res) => {
  console.log('in sign in route');
  User.findOne({'authentication.email': req.basicHTTP.email}, (err, user) => {
    if(err) {
      console.log(err);
      return res.status(401).json({msg: 'invalid username or password'});
    }

    if(!user) return res.status(401).json({msg: 'invalid username or password'});

    if(!user.comparePassword(req.basicHTTP.password)) return res.status(401).json({msg: 'invalid username or password'});

    res.json({token: user.generateToken()}); //no failures, so send back a token
  });
});