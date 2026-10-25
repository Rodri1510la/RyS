// El marcador sube desde 0 hasta el récord al abrir la página, como un marcador de arcade.
// Sin movimiento (o sin JS) se queda el valor final que ya trae el HTML.
(function () {
  "use strict";

  var cifra = document.getElementById("cifra");
  if (!cifra) {
    return;
  }

  var meta = parseInt(cifra.getAttribute("data-meta"), 10);
  var sinMovimiento = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!meta || sinMovimiento) {
    return;
  }

  var duracion = 1600;
  var inicio = null;

  function pintar(valor) {
    cifra.textContent = String(valor).padStart(3, "0");   // 000 → 342, como el marcador real
  }

  function paso(ahora) {
    if (inicio === null) {
      inicio = ahora;
    }
    var avance = Math.min((ahora - inicio) / duracion, 1);
    var suave = 1 - Math.pow(1 - avance, 3);          // frena al acercarse a la meta
    pintar(Math.round(meta * suave));
    if (avance < 1) {
      requestAnimationFrame(paso);
    }
  }

  pintar(0);
  requestAnimationFrame(paso);
})();
