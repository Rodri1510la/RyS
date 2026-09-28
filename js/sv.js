const btnNo = document.querySelector("#btn-random")

function moverAleatoriamente(btn) {
    btn.style.position = "absolute";
    btn.style.fontWeight = "bolder";
    btn.style.top = Math.floor(Math.random() * 90 + 5) + "%"
    btn.style.left = Math.floor(Math.random() * 90 + 5) + "%"
}

/* fsvno.html no tiene #btn-random: sin el guard, addEventListener sobre null
   mataba el script. Ademas mouseenter no fire en tactil, asi que el boton de
   "NO" tambien huye con touchstart/mousedown para que funcione en el movil. */
if (btnNo) {
    function huir(e) {
        moverAleatoriamente(e.target)
    }
    btnNo.addEventListener("mouseenter", huir)
    btnNo.addEventListener("mousedown", huir)
    btnNo.addEventListener("touchstart", huir, { passive: true })
}
