/* =========================================================
   BOYNEXTDOOR Fan Page — main.js

   DOM events:
   1. click → mobile menu
   2. click → smooth scroll for nav links

   BOM events:
   1. load → welcome toast + fade-in check
   2. scroll → navbar style + fade-in effect
   3. resize → close mobile menu on desktop
   4. visibilitychange → change page title
========================================================= */


/* =========================
   VARIABLES
========================= */
var navbar = document.getElementById("navbar");
var menuButton = document.getElementById("menuButton");
var navLinks = document.querySelector(".nav-links");
var fadeItems = document.querySelectorAll(".fade-in");
var pageTitle = "404: Found Next Door ✨🚪🎶";


/* =========================
   TOAST MESSAGE
========================= */
function showToast(message) {
  var toast = document.getElementById("toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(function () {
    toast.classList.remove("show");
  }, 2500);
}


/* =========================
   FADE-IN EFFECT
========================= */
function checkFadeIn() {
  var i;
  for (i = 0; i < fadeItems.length; i++) {
    var itemTop = fadeItems[i].getBoundingClientRect().top;
    var windowHeight = window.innerHeight;

    if (itemTop < windowHeight - 80) {
      fadeItems[i].classList.add("visible");
    }
  }
}


/* =========================
   MOBILE MENU
========================= */
function closeMobileMenu() {
  if (navLinks) {
    navLinks.classList.remove("mobile-active");
  }

  if (menuButton) {
    var spans = menuButton.querySelectorAll("span");

    if (spans[0]) {
      spans[0].style.transform = "";
    }
    if (spans[1]) {
      spans[1].style.opacity = "";
    }
    if (spans[2]) {
      spans[2].style.transform = "";
    }
  }
}

function openMobileMenu() {
  if (navLinks) {
    navLinks.classList.add("mobile-active");
  }

  if (menuButton) {
    var spans = menuButton.querySelectorAll("span");

    if (spans[0]) {
      spans[0].style.transform = "translateY(7px) rotate(45deg)";
    }
    if (spans[1]) {
      spans[1].style.opacity = "0";
    }
    if (spans[2]) {
      spans[2].style.transform = "translateY(-7px) rotate(-45deg)";
    }
  }
}

function toggleMobileMenu() {
  if (!navLinks) {
    return;
  }

  if (navLinks.classList.contains("mobile-active")) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}


/* =========================
   NAVBAR SCROLL STYLE
========================= */
function checkNavbar() {
  if (!navbar) {
    return;
  }

  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.08)";
    navbar.style.backgroundColor = "#ffffff";
  } else {
    navbar.style.boxShadow = "none";
    navbar.style.backgroundColor = "#ffffff";
  }
}


/* =========================
   SMOOTH SCROLL
========================= */
function initSmoothScroll() {
  var links = document.querySelectorAll('a[href^="#"]');
  var i;

  for (i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function (event) {
      var targetId = this.getAttribute("href");
      var targetSection = document.querySelector(targetId);

      if (targetSection) {
        event.preventDefault();
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        closeMobileMenu();
      }
    });
  }
}


/* =========================
   PAGE TITLE CHANGE
========================= */
function handlePageVisibility() {
  if (document.hidden) {
    document.title = "404? Come back next door ✨";
  } else {
    document.title = pageTitle;
  }
}


/* =========================
   EVENT LISTENERS
========================= */

/* DOM: click event for mobile menu */
if (menuButton) {
  menuButton.addEventListener("click", function () {
    toggleMobileMenu();
  });
}

/* DOM: click event for anchor links */
initSmoothScroll();

/* BOM: window load */
window.addEventListener("load", function () {
  checkFadeIn();
  checkNavbar();
  document.title = pageTitle;

  setTimeout(function () {
    showToast("Welcome, ONEDOOR!");
  }, 500);
});

/* BOM: window scroll */
window.addEventListener("scroll", function () {
  checkNavbar();
  checkFadeIn();
});

/* BOM: window resize */
window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {
    closeMobileMenu();
  }
});

/* BOM: page visibility */
document.addEventListener("visibilitychange", function () {
  handlePageVisibility();
});