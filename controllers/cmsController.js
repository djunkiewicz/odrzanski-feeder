function validateNewArticleRequest(body, files) {
  let validationStatus, message;
  if (body.name && body.name === "aaa") {
    validationStatus = true;
    message = "Request is correctly processing";
  } else {
    validationStatus = false;
    message = "Request is invalid";
  }
  return { validationStatus, message };
}

async function saveNewArticle(body, files) {
  const result = validateNewArticleRequest(body, files);
  if (result.validationStatus) {
    console.log("Saving files...");
  } else {
    console.log("Not saving files...");
  }
  return result.message;
}

module.exports = { saveNewArticle };
