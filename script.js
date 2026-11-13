const heartsBg = document.getElementById('heartsBg');
for (let i = 0; i < 18; i++) {
    const heart = document.createElement('div');
    heart.className = 'bg-heart';
    heart.innerText = '❤';
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${Math.random() * 16 + 12}px`;
    heart.style.animationDuration = `${Math.random() * 6 + 6}s`;
    heart.style.animationDelay = `${Math.random() * 5}s`;
    heartsBg.appendChild(heart);
}

// 2. Lógica de puxar e disparar o arco do Cupido
const bowContainer = document.getElementById('bowContainer');
const bowString = document.getElementById('bowString');
const arrow = document.getElementById('arrow');
const envelopeTarget = document.getElementById('envelopeTarget');

let isDragging = false;
let startY = 0;
let pullDistance = 0;

function startPull(clientY) {
    isDragging = true;
    startY = clientY;
}

function movePull(clientY) {
    if (!isDragging) return;
    pullDistance = Math.max(0, Math.min(clientY - startY, 65));
    
    // Puxa a corda e a flecha para baixo
    const stringY = 75 + pullDistance;
    bowString.setAttribute('points', `15,75 80,${stringY} 145,75`);
    arrow.style.transform = `translate(-50%, ${pullDistance}px)`;
}

function releaseArrow() {
    if (!isDragging) return;
    isDragging = false;

    // Volta a corda ao normal
    bowString.setAttribute('points', '15,75 80,75 145,75');

    // Se puxou o suficiente, dispara a flecha!
    if (pullDistance > 20) {
        arrow.style.transition = 'transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)';
        arrow.style.transform = 'translate(-50%, -240px)';

        setTimeout(() => {
            envelopeTarget.classList.add('hit');
        }, 250);

        // Abre a janela retro após acertar o envelope
        setTimeout(() => {
            document.getElementById('screen-envelope').classList.remove('active');
            document.getElementById('screen-window').classList.add('active');
        }, 750);
    } else {
        // Retorna a flecha se puxou pouco
        arrow.style.transition = 'transform 0.2s ease';
        arrow.style.transform = 'translate(-50%, 0px)';
        setTimeout(() => { arrow.style.transition = 'none'; }, 200);
    }
    pullDistance = 0;
}

// Eventos de Rato e Toque (Telemóvel)
bowContainer.addEventListener('mousedown', (e) => startPull(e.clientY));
window.addEventListener('mousemove', (e) => movePull(e.clientY));
window.addEventListener('mouseup', releaseArrow);

bowContainer.addEventListener('touchstart', (e) => startPull(e.touches[0].clientY));
window.addEventListener('touchmove', (e) => movePull(e.touches[0].clientY));
window.addEventListener('touchend', releaseArrow);

// 3. Lógica do botão "NÃO" que foge dentro da janela
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const windowBody = document.getElementById('windowBody');

function moveNoButton() {
    const bodyRect = windowBody.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const maxX = bodyRect.width - btnRect.width - 20;
    const maxY = bodyRect.height - btnRect.height - 20;

    const randomX = Math.max(10, Math.floor(Math.random() * maxX));
    const randomY = Math.max(10, Math.floor(Math.random() * maxY));

    noBtn.style.position = 'absolute';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
}

noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

// 4. Lógica ao clicar em "SIM"
yesBtn.addEventListener('click', () => {
    document.getElementById('questionText').innerText = 'Ebaaa! Eu amo-te! ❤️';
    document.getElementById('buttonsArea').style.display = 'none';
    document.getElementById('finalMessage').style.display = 'block';
    document.getElementById('pixelCat').classList.add('happy');

    startHeartRain();
});

function startHeartRain() {
    const emojis = ['❤️', '💖', '💕', '💗', '💓', '🩷'];
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'rain-heart';
        heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 2 + 2}s`;
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 4000);
    }, 120);
}