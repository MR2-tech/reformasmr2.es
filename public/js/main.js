(function () {
  /*=====================================
    Sticky
    ======================================= */
  window.onscroll = function () {
    var header_navbar = document.querySelector(".navbar-area");
    var sticky = header_navbar.offsetTop;

    if (window.pageYOffset > sticky) {
      header_navbar.classList.add("sticky");
    } else {
      header_navbar.classList.remove("sticky");
    }

    // Add scrolled class for enhanced navbar styling
    if (window.pageYOffset > 50) {
      header_navbar.classList.add("scrolled");
    } else {
      header_navbar.classList.remove("scrolled");
    }

    // show or hide the back-top-top button
    var backToTo = document.querySelector(".scroll-top");
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      backToTo.style.display = "flex";
    } else {
      backToTo.style.display = "none";
    }
  };

  // section menu active
  function onScroll(event) {
    var sections = document.querySelectorAll(".page-scroll");
    var scrollPos =
      document.documentElement.scrollTop || document.body.scrollTop;

    for (var i = 0; i < sections.length; i++) {
      var currLink = sections[i];
      var val = currLink.getAttribute("href");
      var refElement = document.querySelector(val);
      var scrollTopMinus = scrollPos + 73;
      if (
        refElement.offsetTop <= scrollTopMinus &&
        refElement.offsetTop + refElement.offsetHeight > scrollTopMinus
      ) {
        document.querySelector(".page-scroll").classList.remove("active");
        currLink.classList.add("active");
      } else {
        currLink.classList.remove("active");
      }
    }
  }

  window.document.addEventListener("scroll", onScroll);

  //===== close/open navbar-collapse when a  clicked
  let navbarTogglerNine = document.querySelector(
    ".navbar-nine .navbar-toggler"
  );
  navbarTogglerNine.addEventListener("click", function () {
    navbarTogglerNine.classList.toggle("active");
  });

  let navbarNine = document.querySelector("#navbarNine");

  // for menu scroll
  var pageLink = document.querySelectorAll(".page-scroll");

  pageLink.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      console.log("clicked");
      e.preventDefault();
      document.querySelector(elem.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
        offsetTop: 1 - 60,
      });
      navbarTogglerNine.classList.toggle("active");
      navbarNine.classList.remove("show");
    });
  });

  ("use strict");
})();
