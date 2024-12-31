module.exports = function (app, passport) {
  app.get("/cms/", (req, res) => {
    if (req.isAuthenticated()) {
      res.render("./cms/home.ejs");
    } else {
      res.redirect("/cms/login");
    }
  });

  app.get("/cms/login", (req, res) => {
    res.render("./cms/cmsLogin.ejs");
  });

  app.post(
    "/cms/login",
    passport.authenticate("local", {
      successRedirect: "/cms",
      failureRedirect: "/cms/login",
    })
  );

  app.get("/cms/logout", (req, res) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });
};
