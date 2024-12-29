const competitionsController = require("../controllers/competitionsController");
const defaultCriteria = {
  year: new Date().getFullYear().toString(),
  disciplineFeeder: "on",
  disciplineFloat: "on",
  disciplineSpinning: "on",
  category1: "on",
  category3: "on",
};

module.exports = function (app) {
  app.get("/schedule", async (req, res) => {
    const competitions = await competitionsController.getCompetitionsByCriteria(
      defaultCriteria
    );
    res.render("schedule.ejs", {
      competitions: competitions,
      criteria: defaultCriteria,
    });
  });

  app.get("/registration", async (req, res) => {
    res.render("registration.ejs");
  });

  app.get("/regulations", async (req, res) => {
    res.render("regulations.ejs");
  });

  app.post("/schedule/find", async (req, res) => {
    const competitions = await competitionsController.getCompetitionsByCriteria(
      req.body
    );
    res.render("schedule.ejs", {
      competitions: competitions,
      criteria: req.body,
    });
  });
};
