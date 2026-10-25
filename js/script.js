// Sobre de la carta: tocar el sobre (o el texto de abajo) lo abre y despliega la carta;
// tocarlo otra vez lo cierra. El estado vive en la clase "abierto" de #escena.
(function () {
  "use strict";

  var escena = document.getElementById("escena");
  var sobre = document.getElementById("sobre");
  var pista = document.getElementById("pista");
  var carta = document.getElementById("carta");
  if (!escena || !sobre || !pista || !carta) {
    return;
  }

  var sinMovimiento = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var temporizador = null;

  function fijar(abierto) {
    escena.classList.toggle("abierto", abierto);
    pista.setAttribute("aria-expanded", String(abierto));
    pista.textContent = abierto ? "Cerrar el sobre" : "Toca el sobre para abrirlo";

    clearTimeout(temporizador);
    if (abierto) {
      // Cuando termina de desplegarse el papel, la carta queda a la vista.
      // Si el navegador no avisa del fin de la transicion, el temporizador lo cubre.
      temporizador = setTimeout(mostrarCarta, sinMovimiento ? 0 : 1800);
    }
  }

  function mostrarCarta() {
    clearTimeout(temporizador);
    if (escena.classList.contains("abierto")) {
      carta.scrollIntoView({ behavior: sinMovimiento ? "auto" : "smooth", block: "start" });
    }
  }

  carta.addEventListener("transitionend", function (evento) {
    if (evento.target === carta && evento.propertyName === "grid-template-rows") {
      mostrarCarta();
    }
  });

  function alternar() {
    fijar(!escena.classList.contains("abierto"));
  }

  sobre.addEventListener("click", alternar);
  pista.addEventListener("click", alternar);
})();
