const articlesController = require("../controllers/articlesController");

module.exports = function (app) {
  app.get("/article", async (req, res) => {
    //res.render("articles.ejs");
    const result = await articlesController.testController();
    res.send(result);
  });
};
