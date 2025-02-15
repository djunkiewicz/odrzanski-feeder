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

const storage = multer.memoryStorage();
const limits = { fileSize: 10000000 };
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
    try {
      const action = req.query.action === "edit" ? "edit" : "new";
      res.render("./cms/cmsArticles.ejs", {
        action: action,
      });
    } catch (error) {
      res.render("default_pages/400.ejs");
    }
  });

  app.get("/cms/competitions", checkAuthenticated, (req, res) => {
    try {
      const action = req.query.action === "edit" ? "edit" : "new";
      res.render("./cms/cmsCompetitions.ejs", {
        action: action,
      });
    } catch (error) {
      res.render("default_pages/400.ejs");
    }
  });

  app.post("/cms/articles/new", checkAuthenticated, (req, res) => {
    upload.array("images")(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        console.log(`Multer error occurer: ${err.message}`);
        const result = {
          validationStatus: false,
          message: ["Zbyt duża łączna waga plików, maksymalnie 10MB"],
        };
        res.render("./cms/cmsArticles.ejs", {
          response: result,
          originalReq: req.body,
        });
      } else if (err) {
        console.log(`Unknown error occured: ${err.message}`);
        const result = {
          validationStatus: false,
          message: [
            "Nieoczekiwany błąd, sprawdz czy przesłane zdjęcie ma rozszerzenie JPG lub JPEG",
          ],
        };
        res.render("./cms/cmsArticles.ejs", {
          response: result,
          originalReq: req.body,
        });
      } else {
        try {
          const result = await articlesController.saveNewArticle(
            req.body,
            req.files
          );
          res.render("./cms/cmsArticles.ejs", {
            response: result,
            originalReq: req.body,
          });
        } catch (error) {
          res.render("default_pages/400.ejs");
        }
      }
    });
  });

  app.get("/cms/articles/edit/:id", checkAuthenticated, async (req, res) => {
    try {
      const articleToEdit = await articlesController.getArticleById(
        req.params.id
      );
      res.render("./cms/cmsArticles.ejs", {
        action: "edit",
        articleToEdit: articleToEdit,
      });
    } catch (error) {
      res.render("default_pages/400.ejs");
    }
  });

  app.get(
    "/cms/competitions/edit/:id",
    checkAuthenticated,
    async (req, res) => {
      try {
        const competitionToEdit =
          await competitionsController.getCompetitionById(req.params.id);
        res.render("./cms/cmsCompetitions.ejs", {
          action: "edit",
          competitionToEdit: competitionToEdit,
        });
      } catch (error) {
        res.render("default_pages/400.ejs");
      }
    }
  );

  app.post("/cms/articles/edit", checkAuthenticated, (req, res) => {
    upload.array("images")(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        console.log(`Multer error occurer: ${err.message}`);
        const result = {
          validationStatus: false,
          message: ["Zbyt duża łączna waga plików, maksymalnie 10MB"],
        };
        res.render("./cms/cmsArticles.ejs", {
          response: result,
          originalReq: req.body,
          action: "edit",
        });
      } else if (err) {
        console.log(`Unknown error occured: ${err.message}`);
        res.send(err.message);
        const result = {
          validationStatus: false,
          message: [
            "Nieoczekiwany błąd, sprawdz czy przesłane zdjęcie ma rozszerzenie JPG lub JPEG",
          ],
        };
        res.render("./cms/cmsArticles.ejs", {
          response: result,
          originalReq: req.body,
          action: "edit",
        });
      } else {
        try {
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
        } catch (error) {
          res.render("default_pages/400.ejs");
        }
      }
    });
  });

  app.post("/cms/competitions/edit", checkAuthenticated, async (req, res) => {
    try {
      const result = await competitionsController.updateCompetition(req.body);
      const competitionToEdit = result.validationStatus
        ? await competitionsController.getCompetitionById(req.body.id)
        : null;
      res.render("./cms/cmsCompetitions.ejs", {
        response: result,
        originalReq: req.body,
        competitionToEdit: competitionToEdit,
        action: "edit",
      });
    } catch (error) {
      res.render("default_pages/400.ejs");
    }
  });

  app.delete("/cms/articles/delete", checkAuthenticated, async (req, res) => {
    try {
      await articlesController.deleteArticle(+req.body.id);
      res.redirect("/cms/articles?action=edit");
    } catch (error) {
      res.render("default_pages/400.ejs");
    }
  });

  app.delete(
    "/cms/competitions/delete",
    checkAuthenticated,
    async (req, res) => {
      try {
        await competitionsController.deleteCompetition(+req.body.id);
        res.redirect("/cms/competitions?action=edit");
      } catch (error) {
        res.render("default_pages/400.ejs");
      }
    }
  );

  app.post("/cms/competitions/new", checkAuthenticated, async (req, res) => {
    try {
      const result = await competitionsController.saveNewCompetition(req.body);
      res.render("./cms/cmsCompetitions.ejs", {
        response: result,
        originalReq: req.body,
      });
    } catch (error) {
      res.render("default_pages/400.ejs");
    }
  });
};
