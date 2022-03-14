const app = require("express").Router();
const api = require("./api/index");

app.use("/api", api);

module.exports = app;
