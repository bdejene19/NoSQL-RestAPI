const { Reaction, Thought } = require("../models/index");

const createReaction = async (req, res) => {
  let reactionBody = req.body;
  console.log("b: ", reactionBody);
  let reactionAdded = await Reaction.create(reactionBody).catch((err) =>
    res.status(500).json(err)
  );
  if (reactionAdded) {
    let reactionsParent = await Thought.findOneAndUpdate(
      {
        _id: req.params.thoughtId,
      },
      {
        $addToSet: { reactions: reactionAdded },
      }
    ).catch((err) => console.log(err));

    if (reactionsParent) {
      return res.status(201).json(reactionAdded);
    }
  } else {
    return res.status(404).json({ err: "reaction could not be made" });
  }
};

const deleteReaction = async (req, res) => {
  const thoughtId = req.params.thoughtId;
  const reactionId = req.params.reactionId;
  console.log("tid: ", thoughtId);
  console.log("rid", reactionId);
  if (reactionId) {
    let deleted = await Reaction.findOneAndDelete(
      {
        _id: reactionId,
      },
      {
        new: true,
      }
    ).catch((err) => res.status(500).json(err));
    console.log("deleted: ", deleted);
    if (deleted) {
      let updatedThought = await Thought.findOneAndUpdate(
        {
          _id: thoughtId,
        },
        {
          $pull: { reactions: reactionId },
        },
        {
          new: true,
        }
      ).catch((err) => console.log(err));
      if (updatedThought) {
        return res.status(200).json({ deleted });
      }
    } else {
      return res
        .status(404)
        .json({ err: "Delete request on reaction could not be made" });
    }
  } else {
    return res
      .status(404)
      .json({ err: "reaction delete request could not be made" });
  }
};

module.exports = {
  createReaction,
  deleteReaction,
};
