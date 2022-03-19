const { User } = require("../models/index");
const addFriend = async (req, res) => {
  let userID = req.params.userId;
  let friendId = req.params.friendId;
  if (userID && friendId) {
    let newFriendAdded = await User.findOneAndUpdate(
      {
        _id: userID,
      },
      {
        $addToSet: {
          friends: friendId,
        },
      },
      { runValidators: true, new: true }
    ).catch((err) => res.status(500).json(err));

    if (!newFriendAdded) {
      return res
        .status(404)
        .json({ err: "userId of friendId could not be found" });
    }

    return res.status(201).json(newFriendAdded);
  }
};

const deleteFriend = async (req, res) => {
  let userID = req.params.userId;
  let friendId = req.params.friendId;
  console.log("my params body: ", req.params);
  if (userID && friendId) {
    let newFriendAdded = await User.findOneAndUpdate(
      {
        _id: userID,
      },
      {
        $pull: {
          friends: friendId,
        },
      }
    ).catch((err) => res.status(500).json(err));

    if (!newFriendAdded) {
      return res
        .status(404)
        .json({ err: "userId of friendId could not be found" });
    }

    return res.status(201).json(newFriendAdded);
  }
};

module.exports = {
  addFriend,
  deleteFriend,
};
