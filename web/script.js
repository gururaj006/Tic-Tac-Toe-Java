const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restartButton");

let board = ["", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameRunning = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Add click event to all 9 cells
cells.forEach(cell => {
    cell.addEventListener("click", cellClicked);
});

// Add click event to restart button
restartButton.addEventListener("click", restartGame);


// When a cell is clicked
function cellClicked() {

    const index = this.getAttribute("data-index");

    // Don't allow clicking an already filled cell
    // or clicking after the game has ended
    if (board[index] !== "" || !gameRunning) {
        return;
    }

    // Put X or O in the board
    board[index] = currentPlayer;
    this.textContent = currentPlayer;

    // Check whether the game has ended
    checkResult();
}


// Check winner or draw
function checkResult() {

    // Check all winning combinations
    for (let combination of winningCombinations) {

        const first = combination[0];
        const second = combination[1];
        const third = combination[2];

        if (
            board[first] !== "" &&
            board[first] === board[second] &&
            board[first] === board[third]
        ) {

            statusText.textContent =
                "🎉 Player " + currentPlayer + " wins!";

            gameRunning = false;

            return;
        }
    }

    // Check for draw
    // The game is a draw ONLY when all 9 cells are filled
    if (board.every(cell => cell !== "")) {

        statusText.textContent = "🤝 It's a draw!";

        gameRunning = false;

        return;
    }

    // Change player
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.textContent =
        "Player " + currentPlayer + "'s turn";
}


// Restart the game
function restartGame() {

    board = ["", "", "", "", "", "", "", ""];

    currentPlayer = "X";
    gameRunning = true;

    statusText.textContent = "Player X's turn";

    // Clear all 9 cells
    cells.forEach(cell => {
        cell.textContent = "";
    });
}