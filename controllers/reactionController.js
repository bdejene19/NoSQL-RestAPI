const { Reaction, Thought } = require("../models/index");

const createReaction = async (req, res) => {
  let reactionBody = req.body;
  let thought = req.params;
  let reactionAdded = await Reaction.create(reactionBody).catch((err) =>
    res.status(500).json(err)
  );

  if (reactionAdded) {
    Thought.findOneAndUpdate(
      {
        _id: thought.thoughtId,
      },
      {
        $addToSet: { reactions: reactionAdded },
      }
    ).catch((err) => console.log(err));
    return res.status(201).json(reactionAdded);
  } else {
    return res.status(404).json({ err: "reaction could not be made" });
  }
};

const deleteReaction = async (req, res) => {
  let thoughtId = req.params.thoughtId;
  let deleteReactionId = req.params.reactionId;
  if (deleteReactionId) {
    let deletedReaction = await Reaction.findOneAndDelete(
      {
        _id: deleteReactionId,
      },
      {
        new: true,
      }
    ).catch((err) => res.status(500).json(err));

    if (deletedReaction) {
      Thought.findOneAndUpdate(
        {
          _id: thoughtId,
        },
        {
          $pull: { reactions: reactionAdded },
        }
      ).catch((err) => console.log(err));
      res.status(200).json({ deletedReaction });
    } else {
      return res
        .status(404)
        .json({ err: "Delete request on reaction could not be made" });
    }
  }
};

module.exports = {
  createReaction,
  deleteReaction,
};
