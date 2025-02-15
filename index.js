const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const methodOverride = require("method-override");
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
app.use(
  methodOverride((req, res) => {
    if (req.body && req.body._method) {
      return req.body._method;
    }
    return req.method;
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/articlesRoutes")(app);
require("./routes/competitionsRoutes")(app);
require("./routes/informationRoutes")(app);
require("./routes/cmsRoutes")(app, passport);

app.get("*", (req, res) => {
  res.render("default_pages/404.ejs");
});

app.listen(port, () => {
  console.log(`Your app is running on port: ${port}`);
});
