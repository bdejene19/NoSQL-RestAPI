const user = require("express").Router();
const {
  findUserById,
  createUser,

  updateUserById,
  deleteUser,
} = require("../../controllers/userController");

user.route("/:id").get(findUserById).delete(deleteUser).put(updateUserById);
user.route("/").post(createUser);

module.exports = user;
