const db = require("../config/db");

async function testRepository() {
  const result = await db.query("SELECT * FROM articles");
  return result;
}

module.exports = { testRepository };
