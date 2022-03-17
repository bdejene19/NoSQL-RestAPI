const { connect, connection } = require("mongoose");

connect("mongodb://127.0.0.1/socialnetworkDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

module.exports = connection;
