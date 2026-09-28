const yesBtn = document.querySelector('#yesBtn');
const noBtn = document.querySelector('#noBtn');

// Mensaje en la propia pagina (antes era un alert() del navegador) con lluvia de corazones.
function mostrarRespuesta() {
    let box = document.querySelector('.respuesta');
    if (!box) {
        box = document.createElement('div');
        box.className = 'respuesta';
        box.setAttribute('role', 'dialog');
        box.innerHTML =
            '<div class="grande">💖</div>' +
            '<p>Ya sabía tsss, sé que me amas, nunca lo dudé 🥰</p>' +
            '<button type="button">Te amo ❤</button>';
        document.body.appendChild(box);
        box.querySelector('button').addEventListener('click', function () {
            box.classList.remove('open');
        });
    }
    box.classList.add('open');

    for (let i = 0; i < 30; i++) {
        const h = document.createElement('span');
        h.className = 'heart-float';
        h.textContent = ['❤', '💖', '💕'][i % 3];
        h.style.cssText =
            'position:fixed;z-index:3100;pointer-events:none;color:#ff4d6d;left:' + Math.random() * 100 +
            '%;font-size:' + (18 + Math.random() * 26) + 'px;animation-duration:' + (3 + Math.random() * 3) +
            's;animation-delay:' + Math.random() * 1.2 + 's;--dx:' + (Math.random() * 120 - 60) + 'px';
        document.body.appendChild(h);
        h.addEventListener('animationend', function () { h.remove(); });
    }
}

if (yesBtn) {
    yesBtn.addEventListener('click', mostrarRespuesta);
}

// Guard: sino.js solo debe hacer falta en sino.html. Y en movil no existe
// mouseover, asi que el "No" tambien huye cuando lo tocan.
function huirNo() {
    const randomX = Math.random() * 80; // Reduce el rango para mantener el botón visible
    const randomY = Math.random() * 80;
    noBtn.style.top = `${randomY}%`;
    noBtn.style.left = `${randomX}%`;
    noBtn.style.transform = `translate(-${randomX}%, -${randomY}%)`;
}

if (noBtn) {
    noBtn.addEventListener('mouseover', huirNo);
    noBtn.addEventListener('touchstart', huirNo, { passive: true });
}
