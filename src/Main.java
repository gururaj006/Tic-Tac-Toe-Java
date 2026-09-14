import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        boolean playAgain = true;

        System.out.println("================================");
        System.out.println("       TIC-TAC-TOE GAME");
        System.out.println("================================");

        while (playAgain) {

            Board board = new Board();

            char currentPlayer = 'X';

            // Maximum 9 moves
            for (int turn = 1; turn <= 9; turn++) {

                board.display();

                int position;

                // Get a valid position
                while (true) {

                    System.out.print(
                            "Player " + currentPlayer +
                                    ", enter position (1-9): "
                    );

                    position = scanner.nextInt();

                    if (position < 1 || position > 9) {

                        System.out.println(
                                "Invalid position! " +
                                        "Please enter a number between 1 and 9."
                        );

                    } else if (!board.isPositionAvailable(position)) {

                        System.out.println(
                                "That position is already occupied! " +
                                        "Choose another."
                        );

                    } else {

                        break;
                    }
                }

                // Place the player's symbol
                board.placeMark(position, currentPlayer);

                // Check winner
                if (board.hasWon(currentPlayer)) {

                    board.display();

                    System.out.println(
                            "🎉 Player " + currentPlayer + " wins!"
                    );

                    break;
                }

                // Check draw
                if (board.isFull()) {

                    board.display();

                    System.out.println("🤝 It's a draw!");

                    break;
                }

                // Switch player
                if (currentPlayer == 'X') {
                    currentPlayer = 'O';
                } else {
                    currentPlayer = 'X';
                }
            }

            // Ask whether to play again
            System.out.print("\nDo you want to play again? (Y/N): ");

            String choice = scanner.next();

            if (!choice.equalsIgnoreCase("Y")) {
                playAgain = false;
            }

            System.out.println();
        }

        System.out.println("Thanks for playing! 👋");

        scanner.close();
    }
}