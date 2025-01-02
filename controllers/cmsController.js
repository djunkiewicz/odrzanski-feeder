const articlesController = require("../controllers/articlesController")

function validateNewArticleRequest(body, files) {
  let validationStatus;
  const message = {};
  if (body.name && body.name === "aaa") {
    validationStatus = true;
  } else {
    validationStatus = false;
    message.name = "Name is invalid";
  }
  return { validationStatus, message };
}

async function saveNewArticle(body, files) {
  const result = validateNewArticleRequest(body, files);
  if (result.validationStatus) {
    console.log("Saving files...");
  } else {
    console.log("Not saving files...");
  }
  return result;
}

module.exports = { saveNewArticle };
