const multer = require("multer");
const articlesController = require("../controllers/articlesController");
const competitionsController = require("../controllers/competitionsController");

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/cms/login");
};

const fileFilter = (req, file, cb) => {
  const extname = file.originalname.split(".").pop().toLowerCase();
  if (extname === "jpg" || extname === "jpeg") {
    return cb(null, true);
  } else {
    cb(new Error("Tylko pliki JPG lub JPEG są dozwolone!"), false);
  }
};

const storage = multer.memoryStorage(); // Pliki będą przechowywane w pamięci
const limits = { fileSize: 3000000 };
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
});

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

  app.get("/cms/articles", checkAuthenticated, async (req, res) => {
    const action = req.query.action === "edit" ? "edit" : "new";
    res.render("./cms/cmsArticles.ejs", {
      action: action,
    });
  });

  app.get("/cms/competitions", checkAuthenticated, (req, res) => {
    const action = req.query.action === "edit" ? "edit" : "new";
    res.render("./cms/cmsCompetitions.ejs", {
      action: action,
    });
  });

  app.post("/cms/articles/new", checkAuthenticated, (req, res) => {
    upload.array("images")(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        console.log(`Multer error occurer: ${err.message}`);
      } else if (err) {
        console.log(`Unknown error occured: ${err.message}`);
      } else {
        const result = await articlesController.saveNewArticle(
          req.body,
          req.files
        );
        res.render("./cms/cmsArticles.ejs", {
          response: result,
          originalReq: req.body,
        });
      }
    });
  });

  app.get("/cms/articles/edit/:id", checkAuthenticated, async (req, res) => {
    const articleToEdit = await articlesController.getArticleById(
      req.params.id
    );
    res.render("./cms/cmsArticles.ejs", {
      action: "edit",
      articleToEdit: articleToEdit,
    });
  });

  app.post("/cms/articles/edit", checkAuthenticated, (req, res) => {
    upload.array("images")(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        console.log(`Multer error occurer: ${err.message}`);
        res.send(err.message);
      } else if (err) {
        console.log(`Unknown error occured: ${err.message}`);
        res.send(err.message);
        // ogarnąc jakąs jeszcze komunikat o zbyt dużym pliku
      } else {
        const result = await articlesController.updateArticle(
          req.body,
          req.files
        );
        const articleToEdit = result.validationStatus
          ? await articlesController.getArticleById(req.body.id)
          : null;
        res.render("./cms/cmsArticles.ejs", {
          response: result,
          originalReq: req.body,
          articleToEdit: articleToEdit,
          action: "edit",
        });
      }
    });
  });

  app.delete("/cms/articles/delete", checkAuthenticated, async (req, res) => {
    await articlesController.deleteArticle(+req.body.id);
    res.redirect("/cms/articles?action=edit");
  });

  app.post("/cms/competitions/new", checkAuthenticated, async (req, res) => {
    const result = await competitionsController.saveNewCompetition(req.body);
    res.render("./cms/cmsCompetitions.ejs", {
      response: result,
      originalReq: req.body,
    });
  });
};
