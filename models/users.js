const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");

// The user Schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  followOn: {
    type: [{type : Schema.ObjectId, ref : 'Vacation'}],
    default: null
  },
  admin: { type: Boolean, default: false }
});

userSchema.plugin(uniqueValidator);

// Before each save - do:
userSchema.pre("save", function(next) {
  // object "user" -> this
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) return next(err);

    user.password = hash;
    next();
  });
});

// Each user can ".checkPassword()"
userSchema.methods.checkPassword = function(guess) {
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(guess, user.password, function(err, res) {
      if (err) reject(err);
      resolve(res);
    });
  });
};

module.exports = mongoose.model("Users", userSchema);
