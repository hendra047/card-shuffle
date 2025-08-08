import { App } from '@capacitor/app';
import '../css/draw.css';

App.addListener('backButton', () => {
  window.location.href = '/index.html';
});

const CARDS = {
    bonus: [
        'Semangat, tinggal sedikit lagi! ada sedikit permen untuk mu.',
        'Tetap melaju ke depan, maju 1 langkah.',
        'Terus berharap pada Tuhan, Dia kan bukakan jalan, maju 2 langkah.',
        'Saling menyemangati, mungkin akan ada yang baik yang datang.',
        'Ada 1 tambahan dadu untuk mu.',
        'Buka 1 kartu kesempatan',
        'Selamat kamu dapat pujian dari pendampingmu!',
        'Dapat poin 200 secara cuma-cuma bestie!',
        'Ciye dapet plus 100 poin'
    ],
    kesempatan: [
        'Selamat! Tim mendapatkan kartu bebas! Simpan untuk membebaskan teman dari penjara! 1',
        'Selesaikan soal berikut …. Dapatkan 100 poin.',
        'Nyanyikan potong bebek angsa dengan gerakan bebek asli, sambil mengelilingi pendamping dengan suara lantang. Dapat 1 dadu.',
        'Sekarang jam berapa? Kalau bener plus 50 (+- 3 menit dianggap bener)',
        'Hayo tebak, siapa yg mencetuskan ide monopoli ini? Kalau bener dapet 100 poin.'
    ],
    tantangan: [
        'Dalam 5 kesempatan dadu berikutnya, terikan nama kelompok mu sekencang mungkin, atau kehilangan 1 dadu',
        'Tinggalkan 1 anggota kelompok mu untuk masuk ke penjara dalam 3 kesempatan dadu atau buang 3 dadu.',
        'Eaaa, hampir aja kena prank, hehehe',
        'Dalam 2 menit, masing-masing anggota harus menemukan benda berwarna biru dan memberikannya pada pendamping. Bila berhasil dapat 1 dadu, bila gagal buang 2 dadu.',
        'Jalan jongkok sampai 2 tile berikutnya. Bila ada yg berdiri atau terjatuh kehilangan 50 poin.',
        'Pinjam 50 poin atau 1 dadu dong',
        'Hayo tebak, waktu kartu ini dibuat itu siang atau malam? Kalau bener dapet 100 poin kalau salah kehilangan 100 poin.'
    ]
};

let drawPool = [];

const params = new URLSearchParams(window.location.search);
const type = params.get('type') || 'tantangan';

function redirect(target) {
    document.body.classList.add('fade-out');
    setTimeout(() => {
        window.location.href = target;
    }, 400); // match CSS duration
}
window.redirect = redirect;

function drawUnique(items) {
    if (drawPool.length === 0) {
        drawPool = [...items];
        shuffle(drawPool);
    }
    return drawPool.pop();
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function getRandomCard() {
    const cardDeck = CARDS[type] || [];
    return { type, desc: (drawUnique(cardDeck) || '') };
}

function drawCard() {
    const cardBox = document.getElementById('card-box');
    cardBox.classList.add(`card-${type}`, 'flip');
    
    setTimeout(() => {
        const card = getRandomCard();

        const title = document.createElement('div');
        title.className = 'card-title';
        title.textContent = card.type.toUpperCase();

        const description = document.createElement('div');
        description.className = 'card-description';
        description.textContent = card.desc;

        cardBox.innerHTML = '';
        cardBox.appendChild(title);
        cardBox.appendChild(description);
        cardBox.classList.remove('flip');
    }, 300);
}

const drawBtn = document.getElementById('draw-btn');
drawBtn.addEventListener('click', drawCard);

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('card-box').querySelector('.card-cover').classList.add(`card-${type}`);
});