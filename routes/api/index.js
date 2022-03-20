const api = require("express").Router();
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");

api.use("/users", userRoutes);
api.use("/thoughts", thoughtRoutes);

module.exports = api;
