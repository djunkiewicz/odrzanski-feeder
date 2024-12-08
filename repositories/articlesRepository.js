const db = require("../config/db");
const pool = db.promisePool;

async function testRepository() {
  const result = await pool.query("SELECT * FROM articles");
  return result;
}

module.exports = { testRepository };
