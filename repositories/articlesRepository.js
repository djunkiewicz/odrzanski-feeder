const db = require("../config/db");
const pool = db.promisePool;

async function getAllArticles() {
  try {
    const [rows, fields] = await pool.query(
      "SELECT * FROM articles ORDER BY creation_date DESC"
    );
    return rows;
  } catch (err) {
    console.log(err);
  }
}

async function getArticleById(id) {
  try {
    const [rows, fields] = await pool.query(
      "SELECT * FROM articles WHERE id = ?",
      [id]
    );
    return rows;
  } catch (err) {
    console.log(err);
  }
}

async function saveNewArticle(record) {
  try {
    const [rows, fields] = await pool.query(
      "INSERT INTO articles (name, content, gallery_path, creation_date, meta_keywords) VALUES (?, ?, ?, ?, ?)",
      [
        record.name,
        record.content,
        record.gallery_path,
        record.creation_date,
        record.meta_keywords,
      ]
    );
  } catch (err) {
    console.log(err);
  }
}

async function updateArticle(record) {
  try {
    const [rows, fields] = await pool.query(
      "UPDATE articles SET name = ?, content = ?, meta_keywords = ? WHERE id = ?;",
      [record.name, record.content, record.meta_keywords, record.id]
    );
  } catch (err) {
    console.log(err);
  }
}

async function deleteArticle(id) {
  try {
    const [rows, fields] = await pool.query(
      "DELETE FROM articles WHERE id = ?;",
      [id]
    );
  } catch (err) {
    console.log(err);
  }
}

async function getArticlesForSinglePage(pageNumber, pageSize) {
  try {
    const [rows, fields] = await pool.query(
      "SELECT COUNT(*) AS totalArticles FROM articles"
    );
    const totalArticles = rows[0].totalArticles;
    const totalPages = Math.ceil(totalArticles / pageSize);

    const offset = (pageNumber - 1) * pageSize;
    const [rows2, fields2] = await pool.query(
      "SELECT * FROM articles ORDER BY creation_date DESC LIMIT ? OFFSET ?",
      [+pageSize, offset]
    );
    return [rows2, totalArticles];
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAllArticles,
  getArticleById,
  saveNewArticle,
  updateArticle,
  deleteArticle,
  getArticlesForSinglePage,
};
