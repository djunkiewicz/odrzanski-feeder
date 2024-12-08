const db = require("../config/db");
const pool = db.promisePool;

async function getAllArticles() {
  const [rows, fields] = await pool.query("SELECT * FROM articles");
  return rows;
}

module.exports = { getAllArticles };
