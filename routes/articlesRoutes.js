const articlesController = require("../controllers/articlesController");

module.exports = function (app) {
  app.get("/", async (req, res) => {
    res.render("articles.ejs");
  });

  app.get("/article", async (req, res) => {
    res.render("articles.ejs");
  });

  app.get("/data/articles", async (req, res) => {
    try {
      const pageNumber = req.query.pageNumber;
      const pageSize = req.query.pageSize;
      const [articles, totalArticles] =
        await articlesController.getArticlesForSinglePage(pageNumber, pageSize);
      res.json({ articles, totalArticles });
    } catch (error) {
      res.render("default_pages/400.ejs");
    }
  });

  app.get("/data/articles/brief", async (req, res) => {
    try {
      const pageNumber = req.query.pageNumber;
      const pageSize = req.query.pageSize;
      const [articles, totalArticles] =
        await articlesController.getArticlesBriefForSinglePage(
          pageNumber,
          pageSize
        );
      res.json({ articles, totalArticles });
    } catch (error) {
      res.render("default_pages/400.ejs");
    }
  });

  app.get("/article/:id", async (req, res) => {
    try {
      const articleId = req.params.id;
      const article = await articlesController.getArticleById(articleId);
      res.render("singleArticle.ejs", {
        article: article,
        articleURL: `localhost:3000/article/${article.id}`,
      });
    } catch (error) {
      res.render("default_pages/400.ejs");
    }
  });
};
