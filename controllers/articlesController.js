const articlesRepository = require("../repositories/articlesRepository");

async function testController() {
  const result = await articlesRepository.testRepository();
  return result;
}

module.exports = { testController };
