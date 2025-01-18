const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

class Competition {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.discipline = data.discipline;
    this.locationName = data.location_name;
    this.scope = data.scope;
    this.type = data.type;
    this.eventDate = new Date(data.event_date);
    this.eventTime = data.event_time;
    this.creationDate = new Date(data.creation_date);
    this.notes = data.notes;
  }

  getCmsCard() {
    const competitionCard = document.createElement("div");
    competitionCard.classList.add("article-card");

    const title = document.createElement("h2");
    title.textContent = this.name;

    const date = document.createElement("h3");
    date.textContent = this.creationDate.toLocaleDateString(
      "pl-PL",
      dateOptions
    );

    const editBtn = document.createElement("a");
    editBtn.classList.add("btn", "btn-info");
    editBtn.href = `/cms/competition/edit/${this.id}`;
    editBtn.role = "button";
    editBtn.textContent = "Edytuj";

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.classList.add("btn", "btn-danger");
    deleteBtn.name = "id";
    deleteBtn.value = this.id;
    deleteBtn.textContent = "Usuń";
    deleteBtn.setAttribute("data-bs-toggle", "modal");
    deleteBtn.setAttribute("data-bs-target", "#staticBackdrop");
    deleteBtn.setAttribute("need-confirmation", "true");

    competitionCard.appendChild(title);
    competitionCard.appendChild(date);
    competitionCard.appendChild(editBtn);
    competitionCard.appendChild(deleteBtn);

    return competitionCard;
  }

  static createDeleteButton(action, method, idValue) {
    const deleteForm = document.createElement("form");
    deleteForm.action = action;
    deleteForm.method = method;

    const inputHidden = document.createElement("input");
    inputHidden.type = "hidden";
    inputHidden.name = "_method";
    inputHidden.value = "DELETE";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.classList.add("btn", "btn-danger");
    btn.name = "id";
    btn.value = idValue;
    btn.textContent = "Usuń";
    btn.type = "submit";
    btn.classList.add("btn", "btn-danger");

    deleteForm.appendChild(inputHidden);
    deleteForm.appendChild(btn);

    return deleteForm;
  }
}
