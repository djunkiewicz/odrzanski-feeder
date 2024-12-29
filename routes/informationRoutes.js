module.exports = function (app) {
  app.get("/about", (req, res) => {
    res.render("about.ejs");
  });
  app.get("/contact", (req, res) => {
    res.render("contact.ejs");
  });
  app.get("/privacy-policy", (req, res) => {
    res.render("privacyPolicy.ejs");
  });
};
