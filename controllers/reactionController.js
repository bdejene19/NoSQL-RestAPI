const Reaction = require("../models/Reaction");

const createReaction = (req, res) => {
  let newReaction = req.body;
  let reactionAdded = Reaction.create(newReaction).catch((err) =>
    console.log(err)
  );

  if (reactionAdded) {
    return res.status(201).json(reactionAdded);
  } else {
    return res.status(404).json({ err: "reaction could not be made" });
  }
};

const deleteReaction = (req, res) => {
  let deleteReactionId = req.params.id;
  if (deleteReactionId) {
    let deletedReaction = Reaction.findOneAndDelete(
      {
        _id: deleteReactionId,
      },
      {
        new: true,
      }
    ).catch((err) => console.log(err));

    if (deletedReaction) {
      res.status(200).json({ deletedReaction });
    }
  }
};

module.exports = {
  createReaction,
  deleteReaction,
};
