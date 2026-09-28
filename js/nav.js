/* Boton flotante "Menu" que lleva a menu.html (portada con tarjetas).
   Reemplaza al navbar de 14 enlaces. Se inyecta en todas las paginas que
   cargan este script, salvo en la propia portada. */

(function () {
  "use strict";

  function init() {
    // Quita cualquier <nav> hardcodeado que quede en el HTML.
    Array.prototype.forEach.call(document.querySelectorAll("body > nav"), function (old) {
      old.parentNode.removeChild(old);
    });

    var file = window.location.pathname.split("/").pop();
    if (file === "menu.html" || file === "menu") {
      return;
    }

    var a = document.createElement("a");
    a.className = "menu-btn";
    a.href = "menu.html";
    a.setAttribute("aria-label", "Volver al menu");
    a.textContent = "❤ Menú";
    document.body.appendChild(a);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
