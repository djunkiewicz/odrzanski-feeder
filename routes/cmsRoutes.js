const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/cms/login");
};

module.exports = function (app, passport) {
  //authentication, login and logout START
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
  //authentication, login and logout END

  app.get("/cms/", checkAuthenticated, (req, res) => {
    res.render("./cms/home.ejs");
  });
};
