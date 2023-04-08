const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
// middleware
require("dotenv").config();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("White Carrot movie server is running!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
