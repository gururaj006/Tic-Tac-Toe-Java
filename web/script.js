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

/* Connect each visible cell to its position */
cells.forEach((cell, index) => {

    cell.addEventListener("click", function () {
        cellClicked(index);
    });

});

restartButton.addEventListener("click", restartGame);


/* When a cell is clicked */
function cellClicked(index) {

    // Don't allow clicking an already filled cell
    // or clicking after the game has ended
    if (board[index] !== "" || !gameRunning) {
        return;
    }

    // Put X or O in the correct position
    board[index] = currentPlayer;

    // Display X or O in the clicked cell
    cells[index].textContent = currentPlayer;

    checkResult();
}


/* Check winner or draw */
function checkResult() {

    // Check for a winner
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
    // Only happens when ALL 9 positions are filled
    const isDraw = board.every(cell => cell !== "");

    if (isDraw) {

        statusText.textContent = "🤝 It's a draw!";

        gameRunning = false;

        return;
    }

    // Change player
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.textContent =
        "Player " + currentPlayer + "'s turn";
}


/* Restart game */
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