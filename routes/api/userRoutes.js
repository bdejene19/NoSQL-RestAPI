const user = require("express").Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUser,
} = require("../../controllers/userController");

const {
  addFriend,
  deleteFriend,
} = require("../../controllers/friendsController");
user.route("/:id").get(getUserById).delete(deleteUser).put(updateUserById);
user.route("/").get(getAllUsers).post(createUser);
user.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = user;
