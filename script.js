// script.js

document.addEventListener('DOMContentLoaded', function() {
    let score = 0;
    const scoreElement = document.getElementById('score');
    const collectingPage = document.getElementById('collecting-page');
    const wheelPage = document.getElementById('wheel-page');
    const showCollectingPageButton = document.getElementById('show-collecting-page');
    const showWheelPageButton = document.getElementById('show-wheel-page');
    const wheel = document.getElementById('wheel');
    const wheelResult = document.getElementById('wheel-result');

    // Update score display
    function updateScore() {
        scoreElement.textContent = score;
    }

    // Collect coin button click event
    document.getElementById('tap-button').addEventListener('click', function() {
        score++;
        updateScore();
        saveScore(); // Save score with Telegram username
    });

    // Spin wheel button click event
    document.getElementById('spin-button').addEventListener('click', function() {
        spinWheel();
    });

    // Show the selected page
    function showPage(pageToShow) {
        collectingPage.classList.add('hidden');
        wheelPage.classList.add('hidden');
        pageToShow.classList.remove('hidden');
    }

    // Show collecting page by default
    showPage(collectingPage);

    // Navigation button event listeners
    showCollectingPageButton.addEventListener('click', function() {
        showPage(collectingPage);
    });

    showWheelPageButton.addEventListener('click', function() {
        showPage(wheelPage);
    });

    // Function to spin the wheel
    function spinWheel() {
        const segments = [
            '10 Coins',
            '20 Coins',
            '30 Coins',
            '50 Coins',
            '100 Coins',
            'Try Again'
        ];

        const resultIndex = Math.floor(Math.random() * segments.length);

        wheelResult.textContent = `You got: ${segments[resultIndex]}`;

        wheel.style.transition = 'transform 4s ease-out';
        wheel.style.transform = `rotate(${360 * 5 + resultIndex * 60}deg)`;

        wheel.addEventListener('transitionend', () => {
            wheel.style.transition = 'none';
            wheel.style.transform = 'rotate(0deg)';
            setTimeout(() => wheel.style.transition = 'transform 4s ease-out', 100);
        }, { once: true });
    }

    // Save score with Telegram username
    function saveScore() {
        const username = 'example_user'; // Replace with actual Telegram username
        fetch('/save-score', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, score })
        }).then(response => response.json())
          .then(data => console.log(data.message));
    }
});
