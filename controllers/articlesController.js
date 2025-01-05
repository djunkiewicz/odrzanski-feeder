const articlesRepository = require("../repositories/articlesRepository");
const fs = require("node:fs/promises");
const ArticleCondition = require("../classes/ArticleCondition");

async function getAllArticles() {
  const result = await articlesRepository.getAllArticles();
  if (result.length > 0) {
    for (const article of result) {
      article.photo_paths = await getPhotoPaths(article.gallery_path);
    }
    return JSON.stringify(result);
  } else return null;
}

async function getArticleById(id) {
  const result = await articlesRepository.getArticleById(id);
  const article = result[0];
  if (result.length > 0) {
    article.photo_paths = await getPhotoPaths(article.gallery_path);
    return JSON.stringify(article);
  } else return null;
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

module.exports = { getAllArticles, getArticleById, saveNewArticle };

async function getPhotoPaths(directory) {
  try {
    const files = await fs.readdir("public/" + directory);
    const pathList = [];
    if (files.length == 0) {
      pathList.push("/images/no_photo.jpg");
    } else {
      files.forEach((file) => {
        pathList.push("/" + directory + "/" + file);
      });
    }
    return pathList;
  } catch (err) {
    console.log(err);
  }
}

function validateNewArticleRequest(body, files) {
  let validationStatus = true;
  const message = [];
  const conditions = [
    new ArticleCondition(
      (body) => body.name.length > 16,
      "Invalid name, minimum 16 characters"
    ),
    new ArticleCondition(
      (body) => body.content.length > 20,
      "Article content is too short, minimum 20 characters"
    ),
  ];
  for (const condition of conditions) {
    if (!condition.check(body)) {
      message.push(condition.getMessage());
      validationStatus = false;
    }
  }
  const articleRecord = validationStatus
    ? buildArticleRecord(body, files)
    : null;
  return { validationStatus, message, articleRecord };
}

function buildArticleRecord(body, files) {
  return [
    body.name,
    body.content,
    "/gallery/path/",
    new Date().toString(),
    "keyword1 keyword2 keyword3",
  ];
}
