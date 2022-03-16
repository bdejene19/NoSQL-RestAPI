const { Thought } = require("../models/index");
const createThought = (req, res) => {
  let newThought = req.body;

  if (newThought) {
    let successThought = Thought.create(newThought).catch((err) =>
      console.log(err)
    );

    if (successThought) {
      res.status(201).json(successThought);
    } else {
      res
        .status(500)
        .json({ err: "Post request to create thought could not be completed" });
    }
  }
};

const findSpecificThought = (req, res) => {
  let thoughtId = req.params.id;

  if (thoughtId) {
    let thoughtFound = Thought.findById({ _id: thoughtId }).catch((err) =>
      res.status(500).json(err)
    );

    if (thoughtFound) {
      res.status(200).json(thoughtFound);
    }
  }
};

const getAllThoughts = (req, res) => {
  let allThoughts = Thought.find({}).catch((err) => res.status(500).json(err));
  if (allThoughts) {
    res.status(200).json(allThoughts);
  } else {
    res
      .status(404)
      .json({ err: "Get request for all thoughts could not be made " });
  }
};

module.exports = {
  createThought,
  getAllThoughts,
  findSpecificThought,
};
