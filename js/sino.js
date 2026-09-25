const yesBtn = document.querySelector('#yesBtn');
const noBtn = document.querySelector('#noBtn');

yesBtn.addEventListener('click', function () {
    alert('Ya sabia tsss , se que me amas , nunca lo dude 🥰');
});

noBtn.addEventListener('mouseover', function () {
    const randomX = Math.random() * 80; // Reduce el rango para mantener el botón visible
    const randomY = Math.random() * 80;
    noBtn.style.top = `${randomY}%`;
    noBtn.style.left = `${randomX}%`;
    noBtn.style.transform = `translate(-${randomX}%, -${randomY}%)`;
});
