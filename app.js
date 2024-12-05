const express = require("express");
const bodyParser = require("body-parser");

const port = 3000;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/articlesRoutes")(app);

app.get("/", (req, res) => {
  res.render("articles.ejs");
});

app.listen(port, () => {
  console.log(`Your app is running on port: ${port}`);
});
