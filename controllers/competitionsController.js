const competitionsRepository = require("../repositories/competitionsRepository");
const ValidationCondition = require("../classes/ValidationCondition");

async function getAllCompetitions() {
  const result = await competitionsRepository.getAllCompetitions();
  if (result.length > 0) {
    return JSON.stringify(result);
  } else return null;
}

async function getCompetitionsByCriteria(criteria) {
  const result = await competitionsRepository.getCompetitionsByCriteria(
    criteria
  );
  if (result.length > 0) {
    return JSON.stringify(result);
  } else return null;
}

async function saveNewCompetition(body) {
  const result = validateCompetitionRequest(body);
  if (result.validationStatus) {
    // await articlesRepository.saveNewArticle(result.articleRecord);
    console.log("Saving new competition...");
  } else {
    console.log("Not saving competition...");
  }
  return result;
}

module.exports = {
  getAllCompetitions,
  getCompetitionsByCriteria,
  saveNewCompetition,
};

function validateCompetitionRequest(body) {
  let validationStatus = true;
  const message = [];
  const conditions = [
    new ValidationCondition(
      (body) => body.name.length > 5,
      "Invalid name, minimum 5 characters."
    ),
    new ValidationCondition(
      (body) =>
        (body.disciplineFeeder ||
          body.disciplineMethodFeeder ||
          body.disciplineFloat ||
          body.disciplineSpinning) !== undefined,
      "Musisz wybrac przynajmniej jedną dyscyplinę."
    ),
    new ValidationCondition(function (body) {
      let tempLocation =
        body.selectLocation === "1" ? body.location : body.selectLocation;
      return tempLocation != "";
    }, "Musisz wybrac miejsce zawodów."),
    new ValidationCondition(
      (body) => body.scope != "",
      "Musisz wybrac kategorię zawodów."
    ),
    new ValidationCondition(
      (body) => body.dateTimePicker != "",
      "Musisz wybrać datę zawodów i godzinę zbiórki."
    ),
  ];
  for (const condition of conditions) {
    if (!condition.check(body)) {
      message.push(condition.getMessage());
      validationStatus = false;
    }
  }
  const competitionRecord = validationStatus
    ? buildCompetitionRecord(body)
    : null;
  return { validationStatus, message, competitionRecord };
}

function buildCompetitionRecord(body) {
  const fullCreationDate = new Date();
  const [day, month, year] = fullCreationDate
    .toLocaleDateString("pl-PL", {
      timeZone: "UTC",
      day: "2-digit",
      year: "numeric",
      month: "numeric",
    })
    .split(".");
  const time = fullCreationDate.toLocaleTimeString("pl-PL", {
    timeZone: "UTC",
  });
  const [eventDate, eventTime] = body.dateTimePicker.split("T");
  return {
    id: body.id || null,
    name: body.name,
    discipline: competitionsRepository.calculateDisciplineCMS(body),
    location_name:
      +body.selectLocation === 1 ? body.location : body.selectLocation,
    scope: body.scope,
    event_date: eventDate,
    event_time: `${eventTime}:00`,
    creation_date: `${year}-${month}-${day} ${time}`,
    notes: body.notes,
  };
}
