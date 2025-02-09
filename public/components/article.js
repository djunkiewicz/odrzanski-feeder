const cardTextLength = 70;

const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

class Article {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.content = data.content;
    this.galleryPath = data.gallery_path;
    this.creationDate = new Date(data.creation_date);
    this.metaKeywords = data.meta_keywords;
    this.photoPaths = data.photo_paths;
  }

  getCard() {
    const articleCard = document.createElement("div");
    articleCard.classList.add("article-card");

    const link = document.createElement("a");
    link.href = `article/${this.id}`;

    const title = document.createElement("h2");
    title.textContent = this.name;

    const date = document.createElement("h3");
    date.textContent = this.creationDate.toLocaleDateString(
      "pl-PL",
      dateOptions
    );

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("shape");

    const image = document.createElement("img");
    image.src = this.photoPaths[0];

    imgContainer.appendChild(image);

    const content = document.createElement("p");
    const temp = document.createElement("p");
    temp.innerHTML = this.content;
    const extractedText = temp.innerText || temp.textContent;
    content.textContent = extractedText.slice(0, cardTextLength).concat("...");

    articleCard.appendChild(title);
    articleCard.appendChild(date);
    articleCard.appendChild(imgContainer);
    articleCard.appendChild(content);
    link.appendChild(articleCard);

    return link;
  }

  getCmsCard() {
    const articleCard = document.createElement("div");
    articleCard.classList.add("article-card");

    const title = document.createElement("h2");
    title.textContent = this.name;

    const date = document.createElement("h3");
    date.textContent = this.creationDate.toLocaleDateString(
      "pl-PL",
      dateOptions
    );

    const editBtn = document.createElement("a");
    editBtn.classList.add("btn", "btn-info");
    editBtn.href = `/cms/articles/edit/${this.id}`;
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

    articleCard.appendChild(title);
    articleCard.appendChild(date);
    articleCard.appendChild(editBtn);
    articleCard.appendChild(deleteBtn);

    return articleCard;
  }

  getDetailedPage() {
    const container = document.createElement("div");

    const title = document.createElement("h2");
    title.textContent = this.name;

    const date = document.createElement("p");
    date.textContent = this.creationDate.toLocaleDateString(
      "pl-PL",
      dateOptions
    );

    // const image = document.createElement("img");
    // image.src = this.photoPaths[0];

    const content = document.createElement("p");
    content.innerHTML = this.content;
    content.classList.add("article-content");

    const returnButton = document.createElement("a");
    returnButton.classList.add("btn", "btn-primary");
    returnButton.textContent = "Powrót do aktualności";
    returnButton.onclick = function () {
      history.back();
    };

    container.appendChild(title);
    container.appendChild(date);
    // container.appendChild(image);
    container.appendChild(content);
    container.appendChild(returnButton);

    return container;
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
