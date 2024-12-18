const competitionsController = require("../controllers/competitionsController");

module.exports = function (app) {
  app.get("/schedule", async (req, res) => {
    const competitions = await competitionsController.getAllCompetitions();
    res.render("schedule.ejs", { competitions: competitions });
  });
};
