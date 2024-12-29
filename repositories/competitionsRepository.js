const db = require("../config/db");
const pool = db.promisePool;

const classicFeederMask = 0b00000001;
const methodFeederMask = 0b00000010;
const spinningMask = 0b00000100;
const floatMask = 0b00001000;

async function getAllCompetitions() {
  try {
    const [rows, fields] = await pool.query("SELECT * FROM competitions");
    return rows;
  } catch (err) {
    console.log(err);
  }
}

async function getCompetitionsByCriteria(criteria) {
  try {
    const queryParams = getQueryParams(criteria);
    const [rows, fields] = await pool.query(
      `SELECT * FROM competitions
      WHERE event_date BETWEEN ? AND ?
      AND (scope = ? OR scope = ? OR scope = ?)
      AND (discipline & ? = discipline);`,
      queryParams
    );
    return rows;
  } catch (err) {
    console.log(err);
  }
}

function getQueryParams(criteria) {
  const yearCriteria =
    criteria.year === "Wszystko" || criteria.year === ""
      ? false
      : criteria.year;
  const paramsArray = [];
  paramsArray.push(`${yearCriteria || 2023}-01-01`);
  paramsArray.push(`${yearCriteria || new Date().getFullYear()}-12-31`);
  paramsArray.push(criteria.category1 ? "KOŁOWE" : null);
  paramsArray.push(criteria.category2 ? "OKRĘGOWE" : null);
  paramsArray.push(criteria.category3 ? "KLUBOWE" : null);
  paramsArray.push(calculateDiscipline(criteria));
  return paramsArray;
}

function calculateDiscipline(criteria) {
  const discipline =
    (criteria.disciplineFeeder ? classicFeederMask : 0) |
    (criteria.disciplineFeeder ? methodFeederMask : 0) |
    (criteria.disciplineSpinning ? spinningMask : 0) |
    (criteria.disciplineFloat ? floatMask : 0);
  return discipline;
}

module.exports = { getAllCompetitions, getCompetitionsByCriteria };
