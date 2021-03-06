const { Schema, model } = require("mongoose");
const Reaction = require("./Reaction");
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      // validate string length between 1-280 characters
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    username: {
      type: String,
      required: true,
    },

    reactions: [
      {
        ref: "reaction",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const reactionCount = thoughtSchema.virtual("reactionCount");

reactionCount.get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
