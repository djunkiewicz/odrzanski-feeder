const db = require("../config/db");
const pool = db.promisePool;

async function getAllCompetitions() {
  try {
    const [rows, fields] = await pool.query("SELECT * FROM competitions");
    return rows;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getAllCompetitions };
