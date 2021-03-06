# Super Tic Tac Toe
Super Tic Tac Toe (aka Ultimate Tic Tac Toe) is a more challenging version of Tic Tac Toe. Instead of a regular three by three
board with nine squares, the layout of STTT consists of a three by three board with nine Tic Tac Toe boards (one for each Tic
Tac Toe square). To win STTT, a player must win three boards horizontally, vertically or diagonally. A random board is selected
out of the nine Tic Tac Toe boards and player X goes first. Each player may only move within the currently highlighted board.

Once a player has made their move, the next valid board will be highlighted. This board is determined by the previous players' 
move.
Here's an example:

![Start of Game](/images/Move0.png)

![Player X makes first move](/images/Move1.png)

![Player O makes second move](/images/Move2.png)


**First image:** The upper right board has been selected randomly as the first valid board. Player X always goes first. 

**Second image:** Player X moved to the upper left square within the first board. Player O can now select a square within the upper left board.

**Third image:** Player O moved to the middle square. Player X can now select a square within the middle board. 

The game ends when the global Tic Tac Toe board game is complete (When either player has won or there is a draw).

In the case where a player is sent to a board that is already won, you must play there if there is an empty square.

In the case where a player is sent to a full board, the player can choose anywhere on the board to move.
