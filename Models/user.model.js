const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");

let userschema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: { type: String, required: true, unique: true },
});

let saltRounds = 10;
userschema.pre("save", function (next) {
  bcryptjs
    .hash(this.password, saltRounds)
    .then((hash) => {
      this.password = hash;
      console.log(hash);
      next();
    })
    .catch((e) => {
      console.log(e);
    });
});

userschema.methods.comparedPassword = function (userPassword, callback) {
  bcryptjs.compare(userPassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    } else {
      if (!isMatch) {
        return callback(null, isMatch);
      } else {
        return callback(null, this);
      }
    }
  });
};
let user = mongoose.model("Users", userschema);

module.exports = { user };
