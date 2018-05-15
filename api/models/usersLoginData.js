const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const usersLoginDataSchema = new Schema({
    email: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
);
usersLoginDataSchema.statics.generateHash = function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

usersLoginDataSchema.statics.validPassword = function validPassword(password, dbPassword) {

  return bcrypt.compareSync(password, dbPassword);
}
const usersLoginData = mongoose.model('usersLoginData', usersLoginDataSchema);
module.exports = usersLoginData;