(function () {
  function closeMenu(header, button) {
    header.classList.remove("is-open");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Menu openen");
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".site-header").forEach(function (header) {
      var button = header.querySelector(".nav-toggle");
      var nav = header.querySelector(".nav");

      if (!button || !nav) {
        return;
      }

      button.addEventListener("click", function () {
        var isOpen = header.classList.toggle("is-open");
        button.setAttribute("aria-expanded", String(isOpen));
        button.setAttribute("aria-label", isOpen ? "Menu sluiten" : "Menu openen");
      });

      nav.addEventListener("click", function (event) {
        if (event.target.closest("a")) {
          closeMenu(header, button);
        }
      });
    });
  });
})();
