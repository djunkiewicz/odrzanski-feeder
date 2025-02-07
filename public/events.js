$("#articles-container").on("mouseenter", ".article-card", function () {
  $(this).addClass("article-card-hover");
});

$("#articles-container").on("mouseleave", ".article-card", function () {
  $(this).removeClass("article-card-hover");
});
