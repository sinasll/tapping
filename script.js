// script.js
let score = 0;

document.getElementById('tap-button').addEventListener('click', () => {
    score++;
    document.getElementById('score').textContent = score;
});

document.getElementById('coin').addEventListener('click', () => {
    score++;
    document.getElementById('score').textContent = score;
});