const db = require("../config/db");
const pool = db.promisePool;

async function getAllArticles() {
  try {
    const [rows, fields] = await pool.query("SELECT * FROM articles");
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

module.exports = { getAllArticles, getArticleById };
