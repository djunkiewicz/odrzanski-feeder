$(document).ready(function () {
  let sequenceDelay = 100;
  let scrollingTime = 1000;
  let scrollDistance = $("header").height() * 0.9;

  // setTimeout(function () {
  //   if (
  //     $(window).scrollTop() === 0 &&
  //     (window.location.pathname === "/schedule" ||
  //       window.location.pathname === "/schedule/find")
  //   ) {
  //     $("html, body").animate(
  //       {
  //         scrollTop: $(window).scrollTop() + scrollDistance,
  //       },
  //       scrollingTime,
  //       "linear"
  //     );
  //   }
  // }, sequenceDelay);
  // if (
  //   $(window).scrollTop() === 0 &&
  //   (window.location.pathname === "/schedule" ||
  //     window.location.pathname === "/schedule/find")
  // ) {
  //   $("html, body").animate(
  //     {
  //       scrollTop: scrollDistance, // Nie dodajemy $(window).scrollTop(), bo scroll już jest na 0
  //     },
  //     scrollingTime,
  //     "linear", // Możesz zmienić na "linear", jeśli nadal jest problem
  //     function () {
  //       console.log("Animacja zakończona"); // Debugowanie
  //     }
  //   );
  // }

  window.onload = function () {
    let sequenceDelay = 200;
    let scrollingTime = 1700;
    let scrollDistance = $("header").height() * 0.9;

    setTimeout(function () {
      if (
        $(window).scrollTop() === 0 &&
        (window.location.pathname === "/schedule" ||
          window.location.pathname === "/schedule/find")
      ) {
        $("html, body").animate(
          {
            scrollTop: scrollDistance, // Bez $(window).scrollTop(), bo już jest na 0
          },
          scrollingTime,
          "linear"
        );
      }
    }, sequenceDelay);
  };
});
