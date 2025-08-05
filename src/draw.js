import './draw.css';

const suits = ['♠', '♥', '♦', '♣'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

function getRandomCard() {
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const value = values[Math.floor(Math.random() * values.length)];
    return `${value}${suit}`;
}

function drawCard() {
    const cardBox = document.getElementById('card-box');
    console.log(cardBox);
    
    const cardContent = document.getElementById('card-content');
    cardBox.classList.add('flip');
    setTimeout(() => {
        cardContent.textContent = getRandomCard();
        cardBox.classList.remove('flip');
    }, 300);
}

const button = document.getElementById('draw-btn');
button.addEventListener('click', drawCard);

// Register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(reg => console.log('Service Worker registered:', reg))
            .catch(err => console.log('Service Worker registration failed:', err));
    });
}