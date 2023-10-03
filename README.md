# Super Tic Tac Toe

Super Tic Tac Toe (aka Ultimate Tic Tac Toe) is a more challenging version of Tic Tac Toe. Instead of a regular three by three
board with nine squares, the layout of STTT consists of a three by three board with nine Tic Tac Toe boards (one for each Tic
Tac Toe square). To win STTT, a player must win three boards horizontally, vertically or diagonally. Player X can choose which board to play the first move. Each player may only move within the currently highlighted board.

Once a player has made their move, the next valid board will be highlighted. This board is determined by the previous players'
move.

You can find complete rules [here](https://en.wikipedia.org/wiki/Ultimate_tic-tac-toe).

This game was created with Flask, HTML and Vanilla JS. I also made use of `flask-socketio` and `socket.io` to handle the websockets communication. This game started out as a Ultimate TicTacToe game meant to be played locally only (two players on one browser) as an Vanilla JS and OOP refresher. I recently rehashed the game to include Flask and websocket support so two players can connect over the web and play!

## Future Plans

- Allow for different modes. User can choose between 2 Player(local), 2 Player(online via game code), or 1 Player vs AI

## Setup Instructions

1. activate virtual environment
2. Run `pip install -r requirements.txt`
3. Run `python main.py` and visit 127.0.0.1:5000
