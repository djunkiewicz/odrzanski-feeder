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

module.exports = {
  getAllArticles,
  getArticleById,
  saveNewArticle,
  updateArticle,
};
