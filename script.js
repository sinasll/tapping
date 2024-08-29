// script.js

document.addEventListener('DOMContentLoaded', function() {
    let score = 0;
    const scoreElement = document.getElementById('score');
    const collectingPage = document.getElementById('collecting-page');
    const wheelPage = document.getElementById('wheel-page');
    const showCollectingPageButton = document.getElementById('show-collecting-page');
    const showWheelPageButton = document.getElementById('show-wheel-page');

    // Function to update score on screen
    function updateScore() {
        scoreElement.textContent = score;
    }

    // Event listener for tap button
    document.getElementById('tap-button').addEventListener('click', function() {
        score++;
        updateScore();
    });

    // Event listener for spin button
    document.getElementById('spin-button').addEventListener('click', function() {
        spinWheel();
    });

    // Function to display and hide pages
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
        const wheel = document.getElementById('wheel');
        const resultText = document.getElementById('wheel-result');
        const segments = [
            '10 Coins',
            '20 Coins',
            '30 Coins',
            '50 Coins',
            '100 Coins',
            'Try Again'
        ];

        // Generate a random index to determine the result
        const resultIndex = Math.floor(Math.random() * segments.length);

        // Set the result text
        resultText.textContent = `You got: ${segments[resultIndex]}`;

        // Add spinning animation
        wheel.style.transition = 'transform 4s ease-out';
        wheel.style.transform = `rotate(${360 * 5 + resultIndex * 60}deg)`;

        // Reset the wheel after animation ends
        wheel.addEventListener('transitionend', () => {
            wheel.style.transition = 'none';
            wheel.style.transform = 'rotate(0deg)';
            // Reapply the transition for the next spin
            setTimeout(() => wheel.style.transition = 'transform 4s ease-out', 100);
        }, { once: true });
    }
});
