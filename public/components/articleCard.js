class Article {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.content = data.content;
    this.galleryPath = data.gallery_path;
    this.creationDate = data.creation_date;
    this.metaKeywords = data.meta_keywords;
    this.photoPaths = data.photo_paths;
  }

  getCard() {
    const articleCard = document.createElement("div");
    articleCard.classList.add("article-card");

    const title = document.createElement("h2");
    title.textContent = this.name;

    const image = document.createElement("img");
    image.src = this.photoPaths[0];

    const content = document.createElement("p");
    content.textContent = this.content;

    articleCard.appendChild(title);
    articleCard.appendChild(image);
    articleCard.appendChild(content);

    return articleCard;
  }
}
