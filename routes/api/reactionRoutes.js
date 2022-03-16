const {
  createReaction,
  deleteReaction,
} = require("../../controllers/reactionController");
const reaction = require("express").Router();

reaction.route("/").get(createReaction);
reaction.route("/:id").delete(deleteReaction);

module.exports = reaction;
