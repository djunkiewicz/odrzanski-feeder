const articlesRepository = require("../repositories/articlesRepository");

async function getAllArticles() {
  const result = await articlesRepository.getAllArticles();
  return JSON.stringify(result);
}

module.exports = { getAllArticles };
