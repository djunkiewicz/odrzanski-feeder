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
      AND (? & discipline != 0)
      ORDER BY event_date ASC;`,
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
  const disciplineNumber = calculateDiscipline(criteria);
  paramsArray.push(disciplineNumber);
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

function calculateDisciplineCMS(criteria) {
  const discipline =
    (criteria.disciplineFeeder ? classicFeederMask : 0) |
    (criteria.disciplineMethodFeeder ? methodFeederMask : 0) |
    (criteria.disciplineSpinning ? spinningMask : 0) |
    (criteria.disciplineFloat ? floatMask : 0);
  return discipline;
}

async function getCompetitionsForSinglePage(pageNumber, pageSize) {
  try {
    const [rows, fields] = await pool.query(
      "SELECT COUNT(*) AS totalCompetitions FROM competitions"
    );
    const totalCompetitions = rows[0].totalCompetitions;
    const totalPages = Math.ceil(totalCompetitions / pageSize);

    const offset = (pageNumber - 1) * pageSize;
    const [rows2, fields2] = await pool.query(
      "SELECT * FROM competitions ORDER BY creation_date DESC LIMIT ? OFFSET ?",
      [+pageSize, offset]
    );
    return [rows2, totalCompetitions];
  } catch (err) {
    console.log(err);
  }
}

async function getCompetitionById(id) {
  try {
    const [rows, fields] = await pool.query(
      "SELECT * FROM competitions WHERE id = ?",
      [id]
    );
    return rows;
  } catch (err) {
    console.log(err);
  }
}

async function updateCompetition(record) {
  try {
    const [rows, fields] = await pool.query(
      "UPDATE competitions SET name = ?, discipline = ?, location_name = ?, scope = ?, event_date = ?, event_time = ?, notes = ? WHERE id = ?;",
      [
        record.name,
        record.discipline,
        record.location_name,
        record.scope,
        record.event_date,
        record.event_time,
        record.notes,
        record.id,
      ]
    );
  } catch (err) {
    console.log(err);
  }
}

async function deleteCompetition(id) {
  try {
    const [rows, fields] = await pool.query(
      "DELETE FROM competitions WHERE id = ?;",
      [id]
    );
  } catch (err) {
    console.log(err);
  }
}

async function saveNewCompetition(record) {
  try {
    const [rows, fields] = await pool.query(
      "INSERT INTO competitions (name, discipline, location_name, scope, event_date, event_time, creation_date, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        record.name,
        record.discipline,
        record.location_name,
        record.scope,
        record.event_date,
        record.event_time,
        record.creation_date,
        record.notes,
      ]
    );
    console.log(record);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAllCompetitions,
  getCompetitionsByCriteria,
  calculateDiscipline,
  calculateDisciplineCMS,
  getCompetitionsForSinglePage,
  getCompetitionById,
  updateCompetition,
  deleteCompetition,
  saveNewCompetition,
};
