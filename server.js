const express = require("express");
const db = require("./config/connection");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8000;

db.once("open", () => {
  app.listen(PORT, () =>
    console.log(`server running at http://localhost:${PORT}`)
  );
});
