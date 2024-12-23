const competitionsRepository = require("../repositories/competitionsRepository");

async function getAllCompetitions() {
  const result = await competitionsRepository.getAllCompetitions();
  if (result.length > 0) {
    return JSON.stringify(result);
  } else return null;
}

module.exports = { getAllCompetitions };