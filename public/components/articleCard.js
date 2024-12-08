class Article {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.content = data.content;
    this.galleryPath = data.gallery_path;
    this.creationDate = data.creation_date;
    this.metaKeywords = data.meta_keywords;
  }

  getCard() {
    const articleCard = document.createElement("div");
    articleCard.classList.add("article-card");

    const title = document.createElement("h2");
    title.textContent = this.name;

    const content = document.createElement("p");
    content.textContent = this.content;

    const image = document.createElement("p");
    image.textContent = this.galleryPath;

    articleCard.appendChild(title);
    articleCard.appendChild(content);
    articleCard.appendChild(image);

    return articleCard;
  }
}
