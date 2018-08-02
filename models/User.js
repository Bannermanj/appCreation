var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      maxlength: 50,
      required: true
    },
    firstName: {
      type: String,
      maxlength: 50,
      required: true
    },
    lastName: {
      type: String,
      maxlength: 50
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
