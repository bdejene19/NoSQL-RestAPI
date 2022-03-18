const Reaction = require("../models/Reaction");

const createReaction = async (req, res) => {
  let newReaction = req.body;
  let reactionAdded = await Reaction.create(newReaction).catch((err) =>
    console.log(err)
  );

  if (reactionAdded) {
    return res.status(201).json(reactionAdded);
  } else {
    return res.status(404).json({ err: "reaction could not be made" });
  }
};

const deleteReaction = async (req, res) => {
  let deleteReactionId = req.params.id;
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
