const cardTextLength = 20;

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

    const image = document.createElement("img");
    image.src = this.photoPaths[0];

    const content = document.createElement("p");
    content.textContent = this.content.slice(0, cardTextLength).concat("...");

    articleCard.appendChild(title);
    articleCard.appendChild(date);
    articleCard.appendChild(image);
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

    const deleteForm = document.createElement("form");
    deleteForm.action = "/cms/articles/delete";
    deleteForm.method = "POST";

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "submit";
    deleteBtn.classList.add("btn", "btn-danger");
    deleteBtn.name = "id";
    deleteBtn.value = this.id;
    deleteBtn.textContent = "Usuń";

    deleteForm.appendChild(deleteBtn);

    articleCard.appendChild(title);
    articleCard.appendChild(date);
    articleCard.appendChild(editBtn);
    articleCard.appendChild(deleteForm);

    return articleCard;
  }

  getDetailedPage() {
    const container = document.createElement("div");

    const title = document.createElement("h2");
    title.textContent = this.name;

    const date = document.createElement("h3");
    date.textContent = this.creationDate.toLocaleDateString(
      "pl-PL",
      dateOptions
    );

    const image = document.createElement("img");
    image.src = this.photoPaths[0];

    const content = document.createElement("p");
    content.textContent = this.content;

    const returnButton = document.createElement("a");
    returnButton.classList.add("btn", "btn-primary");
    returnButton.textContent = "Powrót do aktualności";
    returnButton.onclick = function () {
      history.back();
    };

    container.appendChild(title);
    container.appendChild(date);
    container.appendChild(image);
    container.appendChild(content);
    container.appendChild(returnButton);

    return container;
  }
}
