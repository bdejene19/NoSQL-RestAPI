const { Schema, model } = require("mongoose");

// define document shape through mongoose ORM by defining Schema
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    // validate email address
    validate: {},
  },

  thoughts: {
    type: [Schema.Types.ObjectId],
    ref: "thought",
  },
  friends: {
    type: [Schema.Types.ObjectId],
    ref: "user",
  },

  toJSON: {
    virtuals: true,
  },
  id: false,
});

const friendCount = userSchema.virtual("friendCount");

friendCount.get(function () {
  return this.friends.length;
});
// creating model
const User = model("user", userSchema);

module.exports = User;
