module.exports = function (app) {
  app.get("/article", (req, res) => {
    res.render("articles.ejs");
  });
};
