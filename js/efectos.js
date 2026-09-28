/* Efectos compartidos (ver css/efectos.css):
   - .reveal  -> aparece con animacion al entrar en pantalla
   - [data-zoom] -> al tocar la imagen se abre en un visor con flechas
   - <body data-hearts> -> corazones que suben de fondo */

(function () {
  "use strict";

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Aparicion al hacer scroll ---------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(items, function (el) { el.classList.add("visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    Array.prototype.forEach.call(items, function (el) { io.observe(el); });
  }

  /* ---------- Corazones flotantes ---------- */
  function initHearts() {
    if (reduce || !document.body.hasAttribute("data-hearts")) return;
    var layer = document.createElement("div");
    layer.className = "hearts-layer";
    layer.setAttribute("aria-hidden", "true");
    document.body.insertBefore(layer, document.body.firstChild);

    var symbols = ["❤", "💖", "💕", "🌷"];

    function spawn() {
      if (document.hidden) return;
      var h = document.createElement("span");
      h.className = "heart-float";
      h.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      h.style.left = Math.random() * 100 + "%";
      h.style.fontSize = 14 + Math.random() * 22 + "px";
      h.style.color = "#ff4d6d";
      h.style.animationDuration = 9 + Math.random() * 8 + "s";
      h.style.setProperty("--dx", (Math.random() * 120 - 60) + "px");
      layer.appendChild(h);
      h.addEventListener("animationend", function () { h.remove(); });
    }
    setInterval(spawn, 1400);
  }

  /* ---------- Visor de fotos ---------- */
  function initLightbox() {
    var imgs = Array.prototype.slice.call(document.querySelectorAll("img[data-zoom]"));
    if (!imgs.length) return;

    var box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Foto ampliada");
    box.innerHTML =
      '<button type="button" class="lb-close" aria-label="Cerrar">×</button>' +
      '<button type="button" class="lb-prev" aria-label="Anterior">‹</button>' +
      '<button type="button" class="lb-next" aria-label="Siguiente">›</button>' +
      "<figure><img alt=\"\"><figcaption></figcaption></figure>";
    document.body.appendChild(box);

    var big = box.querySelector("img");
    var cap = box.querySelector("figcaption");
    var current = 0;

    function show(i) {
      current = (i + imgs.length) % imgs.length;
      var src = imgs[current];
      big.src = src.getAttribute("data-full") || src.currentSrc || src.src;
      big.alt = src.alt || "";
      cap.textContent = src.getAttribute("data-caption") || src.alt || "";
      box.classList.add("open");
    }

    function close() { box.classList.remove("open"); }

    imgs.forEach(function (img, i) {
      img.tabIndex = 0;
      img.addEventListener("click", function () { show(i); });
      img.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); show(i); }
      });
    });

    box.querySelector(".lb-close").addEventListener("click", close);
    box.querySelector(".lb-prev").addEventListener("click", function () { show(current - 1); });
    box.querySelector(".lb-next").addEventListener("click", function () { show(current + 1); });
    box.addEventListener("click", function (e) {
      if (e.target === box || e.target.tagName === "FIGURE") close();
    });
    document.addEventListener("keydown", function (e) {
      if (!box.classList.contains("open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") show(current - 1);
      else if (e.key === "ArrowRight") show(current + 1);
    });

    // Deslizar con el dedo para cambiar de foto.
    var startX = null;
    box.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
    box.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      startX = null;
      if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    });
  }

  function init() {
    initReveal();
    initHearts();
    initLightbox();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
