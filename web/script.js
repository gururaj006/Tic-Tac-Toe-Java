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

cells.forEach(cell => {
    cell.addEventListener("click", cellClicked);
});

restartButton.addEventListener("click", restartGame);

function cellClicked() {

    const index = this.getAttribute("data-index");

    if (board[index] !== "" || !gameRunning) {
        return;
    }

    board[index] = currentPlayer;
    this.textContent = currentPlayer;

    checkResult();
}

function checkResult() {

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

    if (!board.includes("")) {

        statusText.textContent = "🤝 It's a draw!";

        gameRunning = false;

        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.textContent =
        "Player " + currentPlayer + "'s turn";
}

function restartGame() {

    board = ["", "", "", "", "", "", "", ""];

    currentPlayer = "X";
    gameRunning = true;

    statusText.textContent = "Player X's turn";

    cells.forEach(cell => {
        cell.textContent = "";
    });
}