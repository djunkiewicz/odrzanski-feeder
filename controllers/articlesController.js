const articlesRepository = require("../repositories/articlesRepository");
const fs = require("node:fs/promises");
const { rimrafSync } = require("rimraf");
const ValidationCondition = require("../classes/ValidationCondition");

async function getAllArticles() {
  const result = await articlesRepository.getAllArticles();
  if (result.length > 0) {
    for (const article of result) {
      article.photo_paths = await getPhotoPaths(article.gallery_path);
    }
    return JSON.stringify(result);
  } else return null;
}

async function getAllArticlesBrief() {
  const result = await articlesRepository.getAllArticles();
  if (result.length > 0) {
    return result;
  } else return null;
}

async function getArticleById(id) {
  const result = await articlesRepository.getArticleById(id);
  const article = result[0];
  if (result.length > 0) {
    article.photo_paths = await getPhotoPaths(article.gallery_path);
    return article;
  } else return null;
}

async function saveNewArticle(body, files) {
  const result = validateArticleRequest(body);
  if (result.validationStatus) {
    await saveImagesLocally(result.articleRecord.gallery_path, files);
    await articlesRepository.saveNewArticle(result.articleRecord);
  } else {
    console.log("Not saving new article...");
  }
  return result;
}

async function updateArticle(body, files) {
  const result = validateArticleRequest(body);
  if (result.validationStatus) {
    const imgDirectory = (
      await articlesRepository.getArticleById(result.articleRecord.id)
    )[0].gallery_path;
    await updateImagesLocally(imgDirectory, files, body.mode);
    await articlesRepository.updateArticle(result.articleRecord);
    console.log("Updating article...");
  } else {
    console.log("Not updating new article...");
  }
  return result;
}

async function deleteArticle(id) {
  const imgDirectory = (await articlesRepository.getArticleById(id))[0]
    .gallery_path;
  await deleteImageFolder(imgDirectory);
  await articlesRepository.deleteArticle(id);
}

async function getArticlesForSinglePage(pageNumber, pageSize) {
  [articles, totalArticles] = await articlesRepository.getArticlesForSinglePage(
    pageNumber,
    pageSize
  );
  if (articles.length > 0) {
    for (const article of articles) {
      article.photo_paths = await getPhotoPaths(article.gallery_path);
    }
    return [articles, totalArticles];
  } else return null;
}

async function getArticlesBriefForSinglePage(pageNumber, pageSize) {
  [articles, totalArticles] = await articlesRepository.getArticlesForSinglePage(
    pageNumber,
    pageSize
  );
  if (articles.length > 0) {
    return [articles, totalArticles];
  } else return null;
}

module.exports = {
  getAllArticles,
  getArticleById,
  saveNewArticle,
  getAllArticlesBrief,
  updateArticle,
  deleteArticle,
  getArticlesForSinglePage,
  getArticlesBriefForSinglePage,
};

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

function validateArticleRequest(body) {
  let validationStatus = true;
  const message = [];
  const conditions = [
    new ValidationCondition(
      (body) => body.name.length > 5,
      "Invalid name, minimum 5 characters"
    ),
    new ValidationCondition(
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
    id: body.id || null,
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

async function updateImagesLocally(directory, files, mode) {
  const updateDirectory = `public/${directory}`;
  if (mode === "append") {
    for (const file of files) {
      await fs.writeFile(
        updateDirectory + "/" + file.originalname,
        file.buffer
      );
    }
  } else if (mode === "overwrite") {
    rimrafSync(`${updateDirectory}/*`, { glob: true });
    for (const file of files) {
      await fs.writeFile(
        updateDirectory + "/" + file.originalname,
        file.buffer
      );
    }
  }
}

async function deleteImageFolder(directory) {
  const deleteDirectory = `public/${directory}`;
  rimrafSync(`${deleteDirectory}`, { glob: true });
}
