public class Board {

    private char[] board;

    // Create an empty board
    public Board() {
        board = new char[9];

        for (int i = 0; i < board.length; i++) {
            board[i] = ' ';
        }
    }

    // Display the board
    public void display() {

        System.out.println();
        System.out.println(" " + board[0] + " | " + board[1] + " | " + board[2]);
        System.out.println("---+---+---");
        System.out.println(" " + board[3] + " | " + board[4] + " | " + board[5]);
        System.out.println("---+---+---");
        System.out.println(" " + board[6] + " | " + board[7] + " | " + board[8]);
        System.out.println();
    }

    // Place X or O on the board
    public void placeMark(int position, char symbol) {
        board[position - 1] = symbol;
    }

    // Check whether a position is available
    public boolean isPositionAvailable(int position) {
        return board[position - 1] == ' ';
    }

    // Check whether a player has won
    public boolean hasWon(char symbol) {

        int[][] winningCombinations = {
                {0, 1, 2},
                {3, 4, 5},
                {6, 7, 8},
                {0, 3, 6},
                {1, 4, 7},
                {2, 5, 8},
                {0, 4, 8},
                {2, 4, 6}
        };

        for (int[] combination : winningCombinations) {

            if (board[combination[0]] == symbol &&
                    board[combination[1]] == symbol &&
                    board[combination[2]] == symbol) {

                return true;
            }
        }

        return false;
    }

    // Check whether the board is full
    public boolean isFull() {

        for (char cell : board) {

            if (cell == ' ') {
                return false;
            }
        }

        return true;
    }
}