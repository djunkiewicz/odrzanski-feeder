const express = require("express");
const bodyParser = require("body-parser");
const env = require("dotenv");

const port = 3000;
const app = express();
env.config();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/articlesRoutes")(app);

app.get("/", async (req, res) => {
  res.render("articles.ejs");
});

app.listen(port, () => {
  console.log(`Your app is running on port: ${port}`);
});
