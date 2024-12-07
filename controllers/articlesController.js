const articlesRepository = require("../repositories/articlesRepository");

// async function testController() {
//   const result = await articlesRepository.testRepository();
//   return result;
// }

async function testController() {
  return articlesRepository.testRepository();
}

module.exports = { testController };
