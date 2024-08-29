// script.js

document.addEventListener('DOMContentLoaded', function() {
    let score = 0;

    // Function to update score on screen
    function updateScore() {
        document.getElementById('score').textContent = score;
    }

    // Function to save score to local storage
    function saveScore(username, score) {
        let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        highScores.push({ username, score });
        highScores.sort((a, b) => b.score - a.score); // Sort by score descending
        highScores = highScores.slice(0, 5); // Keep only top 5 scores
        localStorage.setItem('highScores', JSON.stringify(highScores));
    }

    // Function to display high scores
    function displayHighScores() {
        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        const highScoresList = document.getElementById('high-scores-list');
        highScoresList.innerHTML = '';
        highScores.forEach(entry => {
            const li = document.createElement('li');
            li.textContent = `${entry.username}: ${entry.score}`;
            highScoresList.appendChild(li);
        });
    }

    // Event listener for tap button
    document.getElementById('tap-button').addEventListener('click', function() {
        score++;
        updateScore();
    });

    // Event listener for save score button
    document.getElementById('save-button').addEventListener('click', function() {
        const username = document.getElementById('username').value.trim();
        if (username) {
            saveScore(username, score);
            displayHighScores();
            document.getElementById('username').value = ''; // Clear the input field
        } else {
            alert('Please enter your name.');
        }
    });

    // Display high scores on page load
    displayHighScores();

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

    // Event listener for spin button
    document.getElementById('spin-button').addEventListener('click', spinWheel);
});
