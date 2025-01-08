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
  const result = validateNewArticleRequest(body);
  if (result.validationStatus) {
    // await saveImagesLocally(result.articleRecord.gallery_path, files);
    // await articlesRepository.saveNewArticle(result.articleRecord);
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

function validateNewArticleRequest(body) {
  let validationStatus = true;
  const message = [];
  const conditions = [
    new ArticleCondition(
      (body) => body.name.length > 5,
      "Invalid name, minimum 5 characters"
    ),
    new ArticleCondition(
      (body) => body.content.length > 6,
      "Article content is too short, minimum 6 characters"
    ),
  ];
  for (const condition of conditions) {
    if (!condition.check(body)) {
      message.push(condition.getMessage());
      validationStatus = false;
    }
  }
  const articleRecord = validationStatus ? buildArticleRecord(body) : null;
  return { validationStatus, message, articleRecord };
}

function buildArticleRecord(body) {
  const fullCreationDate = new Date();
  const [day, month, year] = fullCreationDate
    .toLocaleDateString("pl-PL", {
      timeZone: "UTC",
      day: "2-digit",
      year: "numeric",
      month: "numeric",
    })
    .split(".");
  const time = fullCreationDate.toLocaleTimeString("pl-PL", {
    timeZone: "UTC",
  });
  return {
    name: body.name,
    content: body.content,
    gallery_path: `images/event_${year}_${month}_${day}_${time.replaceAll(
      ":",
      ""
    )}`,
    creation_date: `${year}-${month}-${day} ${time}`,
    meta_keywords: body.keywords,
  };
}

async function saveImagesLocally(directory, files) {
  const newDirectory = `public/${directory}`;
  await fs.mkdir(newDirectory);
  for (const file of files) {
    await fs.writeFile(newDirectory + "/" + file.originalname, file.buffer);
  }
}
