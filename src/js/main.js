import { App } from '@capacitor/app';
import '../css/main.css';

function redirect(target) {
    document.body.classList.add('fade-out');
    setTimeout(() => {
        window.location.href = target;
    }, 400); // match CSS duration
}
window.redirect = redirect;

App.addListener('backButton', ({ canGoBack }) => {
    if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
        redirect('/index.html');
    } else {
        App.exitApp();
    }
});

// Register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then(reg => console.log('Service Worker registered:', reg))
            .catch(err => console.log('Service Worker registration failed:', err));
    });
}