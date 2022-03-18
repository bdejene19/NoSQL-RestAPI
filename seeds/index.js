const connection = require("../config/connection");
const { User, Thought, Reaction } = require("../models/index");
const userData = require("./userData");
const thoughtData = require("./thoughtData");
const reactionData = require("./reactionData");

connection.on("error", (err) => console.log(err));

connection.on("open", async () => {
  console.log("connected to mongoDB");
  // clear existing entries
  await User.deleteMany({});
  await Thought.deleteMany({});
  // await Reaction.deleteMany({});

  //   create new collections with seeded data
  await User.collection.insertMany(userData);
  await Thought.insertMany(thoughtData);
  // await Reaction.insertMany(reactionData);

  //   print created tables
  console.table(userData);
  console.table(thoughtData);
  console.table(reactionData);
  process.exit(0);
});
const seedDatabase = async () => {};
