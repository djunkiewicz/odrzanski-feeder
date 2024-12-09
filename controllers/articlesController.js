const path = require("node:path");
const articlesRepository = require("../repositories/articlesRepository");
const fs = require("node:fs/promises");

async function getAllArticles() {
  const result = await articlesRepository.getAllArticles();
  for (const article of result) {
    article.photo_paths = await getPhotoPaths(article.gallery_path);
  }
  console.log(result);
  return JSON.stringify(result);
}

module.exports = { getAllArticles };

async function getPhotoPaths(directory) {
  try {
    const files = await fs.readdir("public/" + directory);
    const pathList = [];
    if (files.length == 0) {
      pathList.push("images/no_photo.jpg");
    } else {
      files.forEach((file) => {
        pathList.push(directory + "/" + file);
      });
    }
    return pathList;
  } catch (err) {
    console.log(err);
  }
}
