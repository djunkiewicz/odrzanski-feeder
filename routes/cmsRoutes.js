const multer = require("multer");
const path = require("path");

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/cms/login");
};

// Konfiguracja Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/A_test_storage"); // Ścieżka do folderu, w którym będą zapisane pliki
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nadaj unikalną nazwę pliku
  },
});
const storage2 = multer.memoryStorage(); // Pliki będą przechowywane w pamięci
const upload = multer({ storage: storage2 });

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
    res.render("./cms/cmsHome.ejs");
  });

  app.get("/cms/articles", checkAuthenticated, (req, res) => {
    const action = req.query.action === "edit" ? "edit" : "new";
    res.render("./cms/cmsArticles.ejs", { action: action });
  });

  app.get("/cms/competitions", checkAuthenticated, (req, res) => {
    res.render("./cms/");
  });

  app.post(
    "/cms/articles/new",
    checkAuthenticated,
    upload.array("images"),
    (req, res) => {
      const data1 = req.body;
      const data2 = req.files;
      console.log("Text data:");
      console.log(data1);
      console.log("Files:");
      console.log(data2);
      res.redirect("/cms/articles");
    }
  );
};
