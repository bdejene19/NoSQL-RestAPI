const { Reaction, Thought } = require("../models/index");

const createReaction = async (req, res) => {
  let reactionBody = req.body;
  console.log("b: ", reactionBody);
  let reactionAdded = await Reaction.create(reactionBody).catch((err) =>
    res.status(500).json(err)
  );
  if (reactionAdded) {
    console.log("new reaction: ", reactionAdded);
    let reactionsParent = await Thought.findOneAndUpdate(
      {
        _id: reactionAdded.reactionId,
      },
      {
        $addToSet: { reactions: reactionAdded },
      }
    ).catch((err) => console.log(err));
    console.log("my updated thought:", reactionsParent);
    if (reactionsParent) {
      return res.status(201).json(reactionAdded);
    }
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
      let updatedThought = await Thought.findOneAndUpdate(
        {
          _id: thoughtId,
        },
        {
          $pull: { reactions: { reactionAdded: req.params.reactionId } },
        }
      ).catch((err) => console.log(err));
      if (updatedThought) {
        return res.status(200).json({ deletedReaction });
      }
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
