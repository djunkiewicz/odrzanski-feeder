const competitionsController = require("../controllers/competitionsController");
const defaultCriteria = {
  // year: new Date().getFullYear().toString(), TODO: uncomment
  year: 2024,
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
    // const competitions = await competitionsController.getAllCompetitions();
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

  app.get("/data/competitions/brief", async (req, res) => {
    const pageNumber = req.query.pageNumber;
    const pageSize = req.query.pageSize;
    const [competitions, totalCompetitions] =
      await competitionsController.getCompetitionsBriefForSinglePage(
        pageNumber,
        pageSize
      );
    res.json({ competitions, totalCompetitions });
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
