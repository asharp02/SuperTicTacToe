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
    this.board = document.querySelector(`#${id} .board`);
    this.game = document.querySelector(`#${id}`);
    this.cells = document.querySelectorAll(`#${id} td`);
    this.modal = document.querySelector(`#${id} .modal`);
    this.modalMsg = document.querySelector(`#${id} .modal .result_msg`);
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
  });
  this.game.classList.remove("complete");
  this.modal.style.display = "none";
  this.board.classList.remove("active");
  this.modalMsg.innerHTML = "";
};
TicTacToe.prototype.placeChar = function (cell, char) {
  if (cell.innerHTML === "") {
    cell.innerHTML = char;
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
      this.modalMsg.innerHTML = hasWinner
        ? `${this.winner} WINS!! 🎉`
        : "DRAW!!";
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
TicTacToe.prototype.highlightBoard = function () {
  this.board.classList.add("active");
  this.modal.style.display = "none";
};
TicTacToe.prototype.unHighlightBoard = function () {
  this.board.classList.remove("active");
  this.modal.style.display = "block";
};

/**
 * This class contains all methods/properties necessary for functionality of
 * an overall game (Game that takes place on superboard).
 */
class SuperTicTacToe {
  constructor(myTurn) {
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
    this.bigModalMsg = document.querySelector("#superboardmodal .result_msg");
    this.playAgainBtn = document.querySelector("#play-again");
    this.initializeGame();
    this.myTurn = myTurn;
  }
}

SuperTicTacToe.prototype.initializeGame = function () {
  this.bigModal.style.display = "none";
  this.bigModalMsg.innerHTML = "";
  this.currentMove = "X";
  // Select random coordinate within range of 0-8 as first active board
  let randomCoord = Math.floor(Math.random() * 9);

  // Represents current sub board where a player can make a valid move
  this.currentBoard = this.boards[randomCoord];

  // Represents current sub board ids where a player can make a valid move
  this.currentBoardIds = [this.currentBoard.board.id];
  this.unHighlightBoards();
  this.currentBoard.highlightBoard();
  this.handleBoardClick();
  this.handlePlayAgainBtn();
};
SuperTicTacToe.prototype.unHighlightBoards = function () {
  this.boards.forEach(function (board) {
    board.unHighlightBoard();
  });
};
SuperTicTacToe.prototype.handleBoardClick = function () {
  this.boards.forEach((board) => {
    board.cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        // Only allow sub board game move if superboard game is still active
        if (this.superBoard.isGameActive) {
          this.handleGameMove(cell);
        }
      });
    });
  });
};

SuperTicTacToe.prototype.handlePlayAgainBtn = function () {
  this.playAgainBtn.addEventListener("click", () => {
    this.boards.forEach((board) => {
      board.clearBoard();
      board.initializeBoard();
    });
    this.playAgainBtn.style.display = "none";
    this.initializeGame();
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
  this.currentBoard = this.boards[nextBoardId];
  this.currentBoardIds = [];

  // Handles edge case where player selects a full board
  if (this.currentBoard.isFull()) {
    this.boards.forEach((board) => {
      if (!board.isFull()) {
        this.currentBoardIds.push(board.board.id);
        board.highlightBoard();
      }
    });
  } else {
    this.currentBoardIds.push(this.currentBoard.board.id);
    this.currentBoard.highlightBoard();
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
  if (this.currentBoardIds.includes(clickedBoardId) && cell.innerHTML === "") {
    this.currentBoard = this.boards[clickedBoardId];
    this.currentBoard.placeChar(cell, this.currentMove);
    if (this.currentBoard.isGameOver()) {
      this.currentBoard.disableBoard();
      this.placeCharOnSuperBoard(clickedBoardId);
    }
    this.unHighlightBoards();
    if (this.superBoard.isGameActive) {
      this.updateSuperBoardState(cell.dataset["coord"]);
    } else {
      this.endGame();
    }
  }
};
SuperTicTacToe.prototype.endGame = function () {
  this.boards.forEach((board) => {
    board.disableBoard();
    this.bigModalMsg.innerHTML = this.superBoard.modalMsg.innerHTML;
    this.bigModal.style.display = "block";
  });
  const exitButton = this.bigModal.querySelector("button");
  exitButton.addEventListener("click", () => {
    this.bigModal.style.display = "none";
  });
};

let socketio = io();

let myTurn;

socketio.on("assign_turn", (msg) => {
  game = new SuperTicTacToe(msg.myTurn);
});
