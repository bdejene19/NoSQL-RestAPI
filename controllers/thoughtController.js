const { Thought, User } = require("../models/index");
const createThought = async (req, res) => {
  let newThought = req.body;

  if (newThought) {
    let successThought = await Thought.create(newThought).catch((err) =>
      console.log(err)
    );

    if (successThought) {
      let userUpdated = User.findOneAndUpdate(
        {
          _id: newThought.userId,
        },
        {
          $addToSet: { thoughts: successThought },
        }
      ).catch((err) => res.status(500).json(err));
      if (userUpdated) {
        return res.status(201).json(successThought);
      } else {
        return res.status(404).json({ err: "user could not be found" });
      }
    } else {
      res
        .status(500)
        .json({ err: "Post request to create thought could not be completed" });
    }
  }
};

const findSpecificThought = async (req, res) => {
  let thoughtId = req.params.id;

  if (thoughtId) {
    let thoughtFound = await Thought.findById({ _id: thoughtId }).catch((err) =>
      res.status(500).json(err)
    );

    if (thoughtFound) {
      res.status(200).json(thoughtFound);
    }
  }
};

const getAllThoughts = async (req, res) => {
  let allThoughts = await Thought.find({}).catch((err) =>
    res.status(500).json(err)
  );
  if (allThoughts) {
    res.status(200).json(allThoughts);
  } else {
    res
      .status(404)
      .json({ err: "Get request for all thoughts could not be made " });
  }
};

const updateThought = async (req, res) => {
  let thoughtUpdates = req.body;

  if (thoughtUpdates) {
    let successUpdates = await Thought.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      thoughtUpdates
    ).catch((err) => res.status(500).json(err));

    if (!successUpdates) {
      res
        .status(404)
        .json({ err: "Put request on thought could not be compeleted" });
      return;
    }
    return res.status(200).json(thoughtUpdates);
  }
};

const deleteThought = async (req, res) => {
  let thoughtDeletion = req.params.id;
  if (thoughtDeletion) {
    let successDeletion = await Thought.findOneAndDelete({
      _id: thoughtDeletion,
    }).catch((err) => console.log(err));
    console.log(successDeletion);
    if (successDeletion) {
      let userThoughtDeleted = User.findOneAndUpdate(
        {
          _id: thoughtDeletion.userId,
        },
        {
          $pull: { thoughts: thoughtDeletion },
        }
      ).catch((err) => res.status(500).json(err));
      if (userThoughtDeleted) {
        return res.status(200).json(successDeletion);
      } else {
        return res.status(404).json({ err: "user could not be found" });
      }
    } else {
      res
        .status(500)
        .json({ err: "Post request to create thought could not be completed" });
    }
  }
};
module.exports = {
  createThought,
  getAllThoughts,
  findSpecificThought,
  updateThought,
  deleteThought,
};
