const {
  createThought,
  findSpecificThought,
  getAllThoughts,
  updateThought,
  deleteThought,
} = require("../../controllers/thoughtController");
const {
  createReaction,
  deleteReaction,
} = require("../../controllers/reactionController");

const thought = require("express").Router();

thought.route("/").get(getAllThoughts).post(createThought);
thought
  .route("/:id")
  .get(findSpecificThought)
  .put(updateThought)
  .delete(deleteThought);

thought.route("/:thoughtId/reactions").post(createReaction);
thought.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);
module.exports = thought;
