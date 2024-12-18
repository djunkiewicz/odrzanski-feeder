const express = require("express");
const bodyParser = require("body-parser");
const env = require("dotenv");
env.config();
const articlesController = require("./controllers/articlesController");

const port = 3000;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/articlesRoutes")(app);
require("./routes/competitionsRoutes")(app);

app.get("/", async (req, res) => {
  const articles = await articlesController.getAllArticles();
  res.render("articles.ejs", { articles: articles });
});

app.listen(port, () => {
  console.log(`Your app is running on port: ${port}`);
});
