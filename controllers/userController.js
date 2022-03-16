const { User, Reaction } = require("../models/index");

const createUser = (req, res) => {
  const newUser = User.create({
    username: req.body.username,
    email: req.body.email,
    thoughts: [],
    friends: [],
  }).catch((err) => console.log(err));
  if (newUser) {
    return res.status(201).json(newUser);
  } else {
    return res.status(500).json({ err: "user could not be created" });
  }
};

const updateUserById = (req, res) => {
  const updatedUser = User.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      $set: req.body,
    },
    {
      new: true,
    }
  ).catch((err) => console.log(err));
  if (updatedUser) {
    return res.status(202).json(updatedUser);
  } else {
    return res.status(404).json({ err: "user could not be updated" });
  }
};

const findUserById = (req, res) => {
  const user = User.findOne({
    _id: req.params.id,
  });

  if (user) {
    return res.status(200).json(user);
  } else {
    return res.status(404).json({ err: "user could not be found" });
  }
};

const deleteUser = (req, res) => {
  const deletedUser = User.findOneAndDelete(
    {
      _id: req.params.id,
    },
    {
      new: true,
    }
  ).catch((err) => console.log(err));

  if (deletedUser) {
    return res.status(200).json({ deletedUser });
  } else {
    return res
      .status(404)
      .json({ msg: "User could not be found during delete request" });
  }
};

module.exports = {
  createUser,
  updateUserById,
  findUserById,
  deleteUser,
};
