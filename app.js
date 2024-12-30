const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const { Strategy } = require("passport-local");
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

passport.use(
  "local",
  new Strategy(function verify(username, password, cb) {
    if (
      username === process.env.TEST_USERNAME &&
      password === process.env.TEST_PASSWORD
    ) {
      let authenticatedUser = { id: 1, name: "admin1" };
      console.log("Correct credentials.");
      return cb(null, authenticatedUser);
    } else {
      console.log("Invalid login or password.");
      return cb(null, false);
    }
  })
);

passport.serializeUser((user, cb) => {
  console.log("---> serializing user");
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  console.log("---> deserializing user");
  cb(null, user);
});

require("./routes/articlesRoutes")(app);
require("./routes/competitionsRoutes")(app);
require("./routes/informationRoutes")(app);

app.listen(port, () => {
  console.log(`Your app is running on port: ${port}`);
});
