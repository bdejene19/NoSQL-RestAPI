const { User } = require("../models/index");

const createUser = async (req, res) => {
  const newUser = await User.create({
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

const getUserById = async (req, res) => {
  const user = await User.findOne({
    _id: req.params.id,
  });

  if (user) {
    return res.status(200).json(user);
  } else {
    return res.status(404).json({ err: "user could not be found" });
  }
};

const getAllUsers = async (req, res) => {
  const users = await User.find({})
    .populate()
    .catch((err) => res.status(500).json(err));
  if (!users) {
    return res
      .status(404)
      .json({ err: "Users could not be found or do not exist" });
  }
  return res.status(200).json(users);
};

const updateUserById = async (req, res) => {
  const updatedUser = await User.findOneAndUpdate(
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
const deleteUser = async (req, res) => {
  const deletedUser = await User.findOneAndDelete(
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
  getUserById,
  getAllUsers,
  updateUserById,
  deleteUser,
};
