const express = require("express");
const bodyParser = require("body-parser");

const port = 3000;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Initial app");
});

app.listen(port, () => {
  console.log(`Your app is running on port: ${port}`);
});
