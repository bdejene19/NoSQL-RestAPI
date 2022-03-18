const api = require("express").Router();
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");
const reactionRoutes = require("./reactionRoutes");

api.use("/users", userRoutes);
api.use("/thoughts", thoughtRoutes);
api.use("/reactions", reactionRoutes);

module.exports = api;
