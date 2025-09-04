import { App } from '@capacitor/app';
import '../css/draw.css';

App.addListener('backButton', () => {
  window.location.href = '/index.html';
});

const CARDS = {
    bonus: [
        'Tetap melaju ke depan, maju 1 tile.',
        'Terus berharap pada Tuhan, Dia kan bukakan jalan, maju 2 tile.',
        'Saling menyemangati, mungkin akan ada yang baik yang datang.',
        'Ada 1 tambahan dadu untuk mu.',
        'Buka 1 kartu kesempatan',
        'Selamat kamu dapat pujian dari pendampingmu!',
        'Dapat poin 50 secara cuma" bestie!',
        'Ciye dapet plus 100 poin',
        'Kalau disuruh milih mending jalan 3 tile atau dapat 30 poin, mau yg mana? ',
        'Jackpot dapat maju 2 langkah + 1 dadu + 25 poin nih',
    ],
    kesempatan: [
        'Selamat! Tim mendapatkan kartu bebas! Simpan untuk membebaskan teman dari penjara!',
        '"Selesaikan soal berikut:\n\n(5+6x4-3:3)^2\n\nDapatkan 50 poin."',
        'Nyanyikan potong bebek angsa dengan gerakan bebek asli, sambil mengelilingi pendamping dengan suara lantang. Dapat 1 dadu.',
        'Sekarang jam berapa? Kalau bener dapet 20 poin (± 3 menit dianggap bener)',
        'Hayo tebak, siapa yg mencetuskan ide monopoli ini? Kalau bener dapet 30 poin.',
        '"Pilih pelari tercepat mu,\n\nSentuh maskot kelompok lain dalam 15 detik, kalau berhasil dapat 30 poin"',
        'Ada yang ingat tidak ayat retret kali ini diambil dari mana? kalau benar dapat 1 dadu',
        'Eja OBEDIENCE secara bergantian, benar dapat 2 dadu',
        'Sekarang pilih 1 orang untuk ditantang main suit 3 kali dengan panitia. Kalau menang dapat 50 poin. ',
        '"Dari titik mu berdiri, cari tim terdekat!\n\nBuat mereka menyebutkan nama kelompok nya maka 50 poin dipindahkan dari mereka untuk kalian. "',
        'Yelyel yok, ku kasih 50 poin',
        'Sebutkan ayat Alkitab yg kalian hafal, tiap ayat yg dihafal secara benar dan lengkap dapat 1 dadu (max 3). Selain 1 Tesalonika 16-17.',
        'All crew push up 10x. Dapat 1 dadu. Kalau ga kuat boleh dibantu anggota lain',
    ],
    tantangan: [
        'Dalam 5 kesempatan dadu berikutnya, terikan nama kelompok mu sekencang mungkin, atau kehilangan 1 dadu',
        'Tinggalkan 1 anggota kelompok mu untuk masuk ke penjara dalam 3 kesempatan dadu atau buang 3 dadu.',
        'Eaaa, hampir aja kena prank, hehehe',
        'Dalam 2 menit, masing-masing anggota harus menemukan benda berwarna biru dan memberikannya pada pendamping. Bila berhasil dapat 1 dadu, bila gagal hilang 50 poin.',
        'Jalan jongkok sampai 2 tile berikutnya. Bila ada yg berdiri atau terjatuh kehilangan 30 poin.',
        'Setorin 50 poin atau 1 dadu! ',
        'Hayo tebak, waktu kartu ini dibuat itu siang atau malam? Kalau bener dapet 50 poin kalau salah kehilangan 20 poin.',
        '"Pilih pelari tercepat mu,\n\nSentuh maskot kelompok lain dalam 15 detik, kalau gagal minus 30 poin"',
        'Semua anggota main suit dengan panitia. Kalau menang dapat 10 poin, kalau kalah 10 poin hilang',
        '"Semua anggota harus mengangkat satu kakinya selama 15 detik,\n\nSetiap orang yg berhasil plus 10 poin, setiap orang yg gagal minus 5 poin"',
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