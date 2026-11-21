/* Copper State Ceiling Restoration — minimal vanilla JS.
   Mobile menu, dropdown toggles, FAQ accordion. No dependencies, no build. */
(function () {
  "use strict";

  /* ---- Mobile nav ---- */
  var hamburger = document.querySelector(".hamburger");
  var nav = document.querySelector(".main-nav");
  var backdrop = document.querySelector(".nav-backdrop");

  function closeNav() {
    if (nav) nav.classList.remove("open");
    if (backdrop) backdrop.classList.remove("show");
    if (hamburger) hamburger.setAttribute("aria-expanded", "false");
  }
  if (hamburger && nav) {
    hamburger.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      if (backdrop) backdrop.classList.toggle("show", open);
      hamburger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  if (backdrop) backdrop.addEventListener("click", closeNav);

  /* ---- Dropdown toggles (click = mobile; hover handled by CSS on desktop) ---- */
  var toggles = document.querySelectorAll(".nav-toggle");
  toggles.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      // Only intercept on mobile widths where dropdown is accordion-style
      if (window.innerWidth <= 860) {
        e.preventDefault();
        var parent = btn.closest(".has-dropdown");
        if (parent) parent.classList.toggle("open");
      }
    });
  });

  /* ---- FAQ accordion ---- */
  var faqButtons = document.querySelectorAll(".faq__q");
  faqButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq__item");
      var isOpen = item.classList.contains("open");
      // Close siblings in same group for a cleaner accordion feel
      var group = item.parentElement;
      group.querySelectorAll(".faq__item.open").forEach(function (o) {
        if (o !== item) { o.classList.remove("open"); o.querySelector(".faq__q").setAttribute("aria-expanded", "false"); }
      });
      item.classList.toggle("open", !isOpen);
      btn.setAttribute("aria-expanded", isOpen ? "false" : "true");
    });
  });

  /* ---- Close mobile nav on escape ---- */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeNav();
  });

  /* ---- Set current year in footer ---- */
  var yr = document.querySelectorAll(".js-year");
  yr.forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
