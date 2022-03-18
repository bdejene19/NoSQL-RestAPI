const {
  createReaction,
  deleteReaction,
} = require("../../controllers/reactionController");
const reaction = require("express").Router();

reaction.route("/").post(createReaction);
reaction.route("/:id").delete(deleteReaction);

module.exports = reaction;
