const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const statusText = document.getElementById('gameStatus');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'X';
let gameActive = true;
let boardState = Array(9).fill(null);

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = [...cells].indexOf(cell);

    if (boardState[cellIndex] || !gameActive) return;

    cell.textContent = currentPlayer;
    boardState[cellIndex] = currentPlayer;

    checkWinner();
    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `Current Player: ${currentPlayer}`;
    }
}

function checkWinner() {
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            gameActive = false;
            statusText.textContent = `Player ${boardState[a]} wins!`;
            return;
        }
    }

    // Check for draw
    if (!boardState.includes(null)) {
        gameActive = false;
        statusText.textContent = 'It\'s a draw!';
    }
}

function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    boardState.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
    });
    statusText.textContent = `Current Player: ${currentPlayer}`;
}

// Event Listeners
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});
restartBtn.addEventListener('click', restartGame);
