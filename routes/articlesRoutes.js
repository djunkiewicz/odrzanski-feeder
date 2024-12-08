const articlesController = require("../controllers/articlesController");

module.exports = function (app) {
  app.get("/article", async (req, res) => {
    const articles = await articlesController.getAllArticles();
    res.render("articles.ejs", { articles: articles });
  });
};
