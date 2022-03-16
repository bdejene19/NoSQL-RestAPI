const {
  createThought,
  findSpecificThought,
  getAllThoughts,
} = require("../../controllers/thoughtController");

const thought = require("express").Router();

thought.route("/").get(getAllThoughts).post(createThought);
thought.route("/:id").get(findSpecificThought);

module.exports = thought;
