const express = require("express");
const db = require("./config/connection");
const routes = require("./routes/index");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);
const PORT = 8000;

db.once("open", () => {
  app.listen(PORT, () =>
    console.log(`server running at http://localhost:${PORT}`)
  );
});
