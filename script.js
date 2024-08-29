// script.js

document.addEventListener('DOMContentLoaded', function() {
    let score = 0;

    // Function to update score on screen
    function updateScore() {
        document.getElementById('score').textContent = score;
    }

    // Function to save score to the backend
    function saveScore(username, score) {
        fetch('https://your-backend-url.com/save-score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, score })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Score saved:', data);
            displayHighScores(); // Refresh high scores list after saving
        })
        .catch(error => {
            console.error('Error saving score:', error);
        });
    }

    // Function to display high scores
    function displayHighScores() {
        fetch('https://your-backend-url.com/high-scores')
            .then(response => response.json())
            .then(data => {
                const highScoresList = document.getElementById('high-scores-list');
                highScoresList.innerHTML = '';
                data.forEach(entry => {
                    const li = document.createElement('li');
                    li.textContent = `${entry.username}: ${entry.score}`;
                    highScoresList.appendChild(li);
                });
            })
            .catch(error => {
                console.error('Error fetching high scores:', error);
            });
    }

    // Event listener for tap button
    document.getElementById('tap-button').addEventListener('click', function() {
        score++;
        updateScore();
    });

    // Event listener for save score button
    document.getElementById('save-button').addEventListener('click', function() {
        const username = document.getElementById('telegram-username').value;
        if (username) {
            saveScore(username, score);
        } else {
            alert('User information is missing.');
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

    // Fetch Telegram username and set it to hidden field
    function fetchTelegramUsername() {
        // This function would be replaced with actual Telegram username fetching logic
        const username = window.Telegram.WebApp.initDataUnsafe?.user?.username || 'Anonymous';
        document.getElementById('telegram-username').value = username;
    }

    // Call function to fetch Telegram username
    fetchTelegramUsername();
});
