const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// In-memory storage for simplicity
let highScores = [];

app.post('/save-score', (req, res) => {
    const { username, score } = req.body;
    if (!username || score == null) {
        return res.status(400).json({ error: 'Invalid input' });
    }
    highScores.push({ username, score });
    highScores.sort((a, b) => b.score - a.score); // Sort by score descending
    highScores = highScores.slice(0, 5); // Keep only top 5 scores
    res.json({ message: 'Score saved' });
});

app.get('/high-scores', (req, res) => {
    res.json(highScores);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
