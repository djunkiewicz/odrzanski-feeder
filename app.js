const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const { passport } = require("./config/passportConfig");
const env = require("dotenv");
env.config();

const port = 3000;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

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

require("./routes/articlesRoutes")(app);
require("./routes/competitionsRoutes")(app);
require("./routes/informationRoutes")(app);

app.listen(port, () => {
  console.log(`Your app is running on port: ${port}`);
});
