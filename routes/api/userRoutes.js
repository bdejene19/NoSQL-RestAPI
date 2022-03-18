const user = require("express").Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUser,
} = require("../../controllers/userController");

user.route("/:id").get(getUserById).delete(deleteUser).put(updateUserById);
user.route("/").get(getAllUsers).post(createUser);

module.exports = user;
