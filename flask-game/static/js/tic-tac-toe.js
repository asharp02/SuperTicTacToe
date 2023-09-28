/**
 *
 * This file contains an implementation of Super Tic Tac Toe. My implementation
 * includes two class definitions: "Tic Tac Toe" and "Super Tic Tac Toe". The
 * "Tic Tac Toe" class contains an implementation for a single board. "Super Tic Tac Toe"
 * contains implementation of overall/global Tic Tac Toe game.
 *
 * Sub board(local boards) definition: Any of the 9 boards
 * (each with its own game of Tic Tac Toe) that make up the superboard
 * Superboard (global board) definition: Made up of 9 sub boards, the result of any sub board
 * will be marked on the superboard (X, O or D in case of draw)
 *
 *
 */

/**
 * This class contains all methods/properties necessary for functionality of
 * an individual board (any of the 9 sub boards or super board). Takes as input
 * the ID of the sub board.
 */
class TicTacToe {
  constructor(id) {
    this.boardId = id;
    this.board = document.querySelector(`#${id} .board`);
    this.game = document.querySelector(`#${id}`);
    this.cells = document.querySelectorAll(`#${id} td`);
    this.modal = document.querySelector(`#${id} .modal`);
    this.initializeBoard();
  }
}

TicTacToe.prototype.initializeBoard = function () {
  this.isGameActive = true;
  this.winner = "";
  this.fullBoard = false;
};

TicTacToe.prototype.clearBoard = function () {
  this.cells.forEach(function (cell) {
    cell.innerHTML = "";
    cell.classList.remove("finalized");
  });
  this.game.classList.remove("complete");
  this.modal.style.display = "none";
  this.board.classList.remove("active");
  this.board.classList.remove("not-my-turn");
  this.modal.innerHTML = "";
};
TicTacToe.prototype.placeChar = function (cell, char, clicked) {
  if (cell.classList.contains("finalized")) {
    return;
  }
  if (clicked) {
    cell.classList.add("finalized");
  }
  cell.innerHTML = char;
};
TicTacToe.prototype.removeChar = function (cell) {
  if (!cell.classList.contains("finalized")) {
    cell.innerHTML = "";
  }
};
TicTacToe.prototype.checkRows = function () {
  for (let row = 0; row < 9; row += 3) {
    let char1 = this.cells[row].innerHTML;
    let char2 = this.cells[row + 1].innerHTML;
    let char3 = this.cells[row + 2].innerHTML;

    // Check for "D" required for superboard if a subboard ends in draw
    if (char1 === char2 && char2 === char3 && char1 !== "" && char1 !== "D") {
      this.winner = char1;
      return true;
    }
  }
  return false;
};
TicTacToe.prototype.checkCols = function () {
  for (let i = 0; i < 3; i++) {
    let char1 = this.cells[i].innerHTML;
    let char2 = this.cells[i + 3].innerHTML;
    let char3 = this.cells[i + 6].innerHTML;

    // Check for "D" required for superboard if a subboard ends in draw
    if (char1 === char2 && char2 === char3 && char1 !== "" && char1 !== "D") {
      this.winner = char1;
      return true;
    }
  }
  return false;
};
TicTacToe.prototype.checkDiagonal = function () {
  let lu_corner = this.cells[0].innerHTML;
  let middle = this.cells[4].innerHTML;
  let rl_corner = this.cells[8].innerHTML;
  let ru_corner = this.cells[2].innerHTML;
  let ll_corner = this.cells[6].innerHTML;

  // Check for "D" required for superboard if a subboard ends in draw
  if (
    lu_corner === middle &&
    middle === rl_corner &&
    lu_corner != "" &&
    lu_corner !== "D"
  ) {
    this.winner = lu_corner;
    return true;
  }
  if (
    ru_corner === middle &&
    middle === ll_corner &&
    ru_corner != "" &&
    ru_corner !== "D"
  ) {
    this.winner = ru_corner;
    return true;
  }
  return false;
};
TicTacToe.prototype.isFull = function () {
  for (let i = 0; i < 9; i++) {
    if (this.cells[i].innerHTML === "") {
      return false;
    }
  }
  this.fullBoard = true;
  return true;
};
TicTacToe.prototype.disableBoard = function () {
  this.isGameActive = false;
  this.game.classList.add("complete");
};
TicTacToe.prototype.isGameOver = function () {
  if (this.isGameActive) {
    const hasWinner =
      this.checkRows() || this.checkCols() || this.checkDiagonal();
    const fullBoard = this.isFull();
    if (hasWinner || fullBoard) {
      console.log(hasWinner);
      console.log(this.winner);
      this.modal.innerHTML = hasWinner ? `${this.winner}` : "D";
      this.modal.style.display = "block";

      // Required for superboard in the case of a draw
      if (!this.winner) {
        this.winner = "D";
      }
      return true;
    }
    return false;
  }
};
TicTacToe.prototype.highlightBoard = function (myTurn) {
  this.board.classList.add("active");
  if (!myTurn) {
    this.board.classList.add("not-my-turn");
  }
  this.modal.style.display = "none";
};

TicTacToe.prototype.unHighlightBoard = function () {
  this.board.classList.remove("active");
  this.board.classList.remove("not-my-turn");
  this.modal.style.display = "block";
};

/**
 * This class contains all methods/properties necessary for functionality of
 * an overall game (Game that takes place on superboard).
 */
class SuperTicTacToe {
  constructor(myChar) {
    this.board0 = new TicTacToe("game0");
    this.board1 = new TicTacToe("game1");
    this.board2 = new TicTacToe("game2");
    this.board3 = new TicTacToe("game3");
    this.board4 = new TicTacToe("game4");
    this.board5 = new TicTacToe("game5");
    this.board6 = new TicTacToe("game6");
    this.board7 = new TicTacToe("game7");
    this.board8 = new TicTacToe("game8");
    this.superBoard = new TicTacToe("game9");
    this.boards = [
      this.board0,
      this.board1,
      this.board2,
      this.board3,
      this.board4,
      this.board5,
      this.board6,
      this.board7,
      this.board8,
      this.superBoard,
    ];
    this.bigModal = document.querySelector("#superboardmodal");
    this.bigModalMsg = document.querySelector("#superboardmodal p");
    this.playAgainBtn = document.querySelector("#play-again");
    this.currentBoard;
    this.playerList = document.querySelector(".player-table");
    this.myTurn = myChar == "X";
  }
}

SuperTicTacToe.prototype.initializeGame = function () {
  this.bigModal.style.display = "none";
  this.bigModalMsg.innerHTML = "";
  this.currentMove = "X";

  // Represents current sub board where a player can make a valid move
  this.currentBoardIds = [];

  this.unHighlightBoards();
  this.setAllBoardsActive();
  this.handleBoardEvents();
  this.handlePlayAgainBtn();
};

SuperTicTacToe.prototype.updatePlayerList = function (
  playerOneName,
  playerTwoName,
  myChar
) {
  const playerOneCell = document.querySelector(".player-one");
  const playerTwoCell = document.querySelector(".player-two");
  playerOneCell.innerHTML = `${playerOneName} (X)`;
  if (playerTwoName) {
    playerTwoCell.innerHTML = `${playerTwoName} (O)`;
    playerOneCell.classList.add("active");
  }
};

SuperTicTacToe.prototype.changeHighlightedPlayer = function () {
  const playerOneCell = document.querySelector(".player-one");
  const playerTwoCell = document.querySelector(".player-two");
  if (playerOneCell.classList.contains("active")) {
    playerOneCell.classList.remove("active");
    playerTwoCell.classList.add("active");
  } else {
    playerTwoCell.classList.remove("active");
    playerOneCell.classList.add("active");
  }
};

SuperTicTacToe.prototype.unHighlightBoards = function () {
  this.boards.forEach(function (board) {
    board.unHighlightBoard();
  });
};

SuperTicTacToe.prototype.handleBoardEvents = function () {
  this.boards.forEach((board) => {
    board.cells.forEach((cell) => {
      let targetBoard = this.boards[cell.dataset["board"]];
      cell.addEventListener("click", () => {
        // Only allow sub board game move if superboard game is still active
        if (this.superBoard.isGameActive && this.myTurn) {
          this.handleGameMove(cell);
          socketio.emit("gameMove", cell.dataset.board, cell.dataset.coord);
        }
      });
      cell.addEventListener("mouseover", () => {
        if (
          this.superBoard.isGameActive &&
          this.myTurn &&
          this.currentBoardIds.includes(cell.dataset["board"])
        ) {
          targetBoard.placeChar(cell, this.currentMove, false);
        }
      });
      cell.addEventListener("mouseout", () => {
        if (
          this.superBoard.isGameActive &&
          this.myTurn &&
          this.currentBoardIds.includes(cell.dataset["board"])
        ) {
          targetBoard.removeChar(cell);
        }
      });
    });
  });
};

SuperTicTacToe.prototype.setAllBoardsActive = function () {
  this.boards.forEach((board) => {
    if (!board.isFull()) {
      this.currentBoardIds.push(board.board.id);
      board.highlightBoard(this.myTurn);
    }
  });
};

SuperTicTacToe.prototype.restartGame = function () {
  this.boards.forEach((board) => {
    board.clearBoard();
    board.initializeBoard();
  });
  this.playAgainBtn.style.display = "none";
  this.initializeGame();
};

SuperTicTacToe.prototype.handlePlayAgainBtn = function () {
  this.playAgainBtn.addEventListener("click", () => {
    socketio.emit("restartGame", player);
    this.restartGame();
  });
};
/**
 * Handles placement of character on Super board. Called after a sub board
 * game has completed.
 *
 * Params: {Number} finishedBoardlId - ID of the completed sub board
 * that corresponds to the cell in the super board.
 *
 */
SuperTicTacToe.prototype.placeCharOnSuperBoard = function (finishedBoardId) {
  // Grab corresponding cell in superboard from Id of completed sub board
  let superBoardCoord = this.superBoard.board.querySelector(
    `td#cell${finishedBoardId}`
  );

  // Place the winning char of the completed sub board game on the super board
  this.superBoard.placeChar(superBoardCoord, this.currentBoard.winner);
  if (this.superBoard.isGameOver()) {
    this.superBoard.disableBoard();
    this.playAgainBtn.style.display = "block";
  }
};
SuperTicTacToe.prototype.updateSuperBoardState = function (nextBoardId) {
  this.currentMove = this.currentMove === "X" ? "O" : "X";
  this.myTurn = !this.myTurn;
  this.currentBoard = this.boards[nextBoardId];
  this.currentBoardIds = [];

  // Handles edge case where player selects a full board
  if (this.currentBoard.isFull()) {
    this.setAllBoardsActive();
  } else {
    this.currentBoardIds.push(this.currentBoard.board.id);
    this.currentBoard.highlightBoard(this.myTurn);
  }
};

/**
 * Handles main functionality of a game. Calls necessary methods to:
 * 1) Place character on clicked sub board
 * 2) Check if sub board game is complete
 * 3) Check if super board game is complete
 *
 * Params: {Element} Clicked cell on board. Element has dataset including
 * Board Id and Cell Id
 *
 */
SuperTicTacToe.prototype.handleGameMove = function (cell) {
  let clickedBoardId = cell.dataset["board"];
  if (
    this.currentBoardIds.includes(clickedBoardId) &&
    !cell.classList.contains("finalized")
  ) {
    this.currentBoard = this.boards[clickedBoardId];
    this.currentBoard.placeChar(cell, this.currentMove, true);

    if (this.currentBoard.isGameOver()) {
      this.currentBoard.disableBoard();
      this.placeCharOnSuperBoard(clickedBoardId);
    }
    this.unHighlightBoards();
    if (this.superBoard.isGameActive) {
      this.updateSuperBoardState(cell.dataset["coord"]);
      this.changeHighlightedPlayer();
    } else {
      this.endGame();
    }
  }
};
SuperTicTacToe.prototype.endGame = function () {
  this.boards.forEach((board) => {
    board.disableBoard();
    console.log(this.currentBoard);
    console.log(this.currentBoard.modal);
    this.bigModalMsg.innerHTML = `${this.currentBoard.modal.innerHTML} WINS 🎉`;
    this.bigModal.style.display = "block";
  });
  if (this.superBoard.winner === "O") {
    this.myTurn = !this.myTurn;
    this.changeHighlightedPlayer();
  }
  const exitButton = this.bigModal.querySelector("button");
  exitButton.addEventListener("click", () => {
    this.bigModal.style.display = "none";
  });
};

let socketio = io();
let myTurn;
let nameInput = document.querySelector("#name-input");
let player = nameInput.dataset.name;
let playerChar;
let game;

socketio.on("init_game", (msg) => {
  let roomData = msg.room;
  let isFirstPlayer = msg.room["users"][player] === "X";
  playerChar = roomData["users"][player];
  if (Object.keys(roomData["users"]).length == 1) {
    game = new SuperTicTacToe(playerChar);
  } else if (!isFirstPlayer) {
    game = new SuperTicTacToe(playerChar);
  }
  handlePlayerList(roomData);
});

socketio.on("start_game", (msg) => {
  const getStartedMsg = document.querySelector(".get-started-msg");
  getStartedMsg.style.display = "none";
  Object.getPrototypeOf(game).initializeGame.call(game);
});

function handlePlayerList(roomData) {
  let playerX;
  let playerO;
  for (user in roomData["users"]) {
    if (roomData["users"][user] === "X") {
      playerX = user;
    } else {
      playerO = user;
    }
  }
  Object.getPrototypeOf(game).updatePlayerList.call(
    game,
    playerX,
    playerO,
    playerChar
  );
}

socketio.on("update_board", (msg) => {
  if (player !== msg.lastPlayerToMove) {
    let cell = document.querySelector(
      `[data-board="${msg.boardId}"][data-coord="${msg.cellCoord}"]`
    );
    Object.getPrototypeOf(game).handleGameMove.call(game, cell);
  }
});

socketio.on("playAgain", (charWhoRestarted) => {
  if (playerChar !== charWhoRestarted) {
    game.restartGame();
  }
});

socketio.on("oppLeft", () => {
  setTimeout(() => {
    window.location.href = "/";
  }, 3000);
  alert("Opponent has left the game!");
});
