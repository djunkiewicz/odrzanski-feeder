const articlesController = require("../controllers/articlesController");

module.exports = function (app) {
  app.get("/", async (req, res) => {
    res.render("articles.ejs");
  });

  app.get("/article", async (req, res) => {
    res.render("articles.ejs");
  });

  app.get("/data/articles", async (req, res) => {
    const pageNumber = req.query.pageNumber;
    const pageSize = req.query.pageSize;
    const [articles, totalArticles] =
      await articlesController.getArticlesForSinglePage(pageNumber, pageSize);
    res.json({ articles, totalArticles });
  });

  app.get("/article/:id", async (req, res) => {
    const articleId = req.params.id;
    const article = await articlesController.getArticleById(articleId);
    res.render("singleArticle.ejs", { article: article });
  });
};
