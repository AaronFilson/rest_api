const express = require('express');
const User = require(__dirname + '/../models/user');
const jsonParser = require('body-parser').json();
const handleDBError = require(__dirname + '/../lib/handleDBError');
const basicHTTP = require(__dirname + '/../lib/basic_http');
const jwtLib = require(__dirname + '/../lib/jwt_auth');

var authRouter = module.exports = exports = express.Router();

authRouter.post('/signup', jsonParser, (req, res) => {

  var newUser = new User();
  if(!((req.body.email || '').length && (req.body.password || '').length > 3)){
    return res.status(401).json({msg: 'invalid username or password'});
  }

  debugger;
  newUser.username = req.body.signupname || req.body.email;
  newUser.authentication.email = req.body.email;
  newUser.hashPassword(req.body.password);
  newUser.save((err, data) => {
    if(err) return handleDBError(err, res);

    res.status(200).json({token: data.generateToken()});
  });
});

authRouter.post('/signin', basicHTTP, (req, res) => {

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

authRouter.get('/currentuser', jwtLib, (req, res) => {
  var temp = req.user.username || '';
  res.status(200).json({user: req.user.username});
});

