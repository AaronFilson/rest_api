const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
  username: String,
  authentication: {
    email: String,
    password: String
  }
});

userSchema.methods.hashPassword = function (password) {
  var hash = this.authentication.password = bcrypt.hashSync(password, 8);
  return hash;
};

userSchema.methods.comparePassword = function (password) {
  return bcypt.compareSync(password, this.authentication.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign({id: this._id}, process.env.APP_SECRET || 'ChangeMe');
};

module.exports = exports = mongoose.model('User', userSchema);
