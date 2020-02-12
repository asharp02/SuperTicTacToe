class TicTacToe{
    constructor(id){
        this.board = document.querySelector(`#${id} .board`);
        this.game = document.querySelector(`#${id}`);
        this.cells = document.querySelectorAll(`#${id} td`);
        this.modal = document.querySelector(`#${id} .modal`);
        this.modalMsg = document.querySelector(`#${id} .modal .result_msg`);
        this.initializeBoard();
    }

    initializeBoard(){
        this.isGameActive = true;
        this.winner = "";
        this.fullBoard = false;
    }
    clearBoard(){
        this.cells.forEach(function(cell){
            cell.innerHTML = "";
        })
        this.game.classList.remove("complete")
        this.modal.style.display = "none";
        this.board.classList.remove("active");
        this.modalMsg.innerHTML = "";
    }
    placeChar(cell, char){
        if(cell.innerHTML === ""){
            cell.innerHTML = char;
        }
    }
    checkRows(){
        for(let row=0; row < 9; row+=3){
            let char1 = this.cells[row].innerHTML;
            let char2 = this.cells[row+1].innerHTML;
            let char3 = this.cells[row+2].innerHTML;
            if(char1 === char2 && char2 === char3 && char1 !== "" && char1 !== "D"){
                this.winner = char1;
                return true;
            }
        }
        return false;
    }
    checkCols(){
        for(let i=0; i < 3; i++){
            let char1 = this.cells[i].innerHTML;
            let char2 = this.cells[i+3].innerHTML;
            let char3 = this.cells[i+6].innerHTML;

            if(char1 === char2 && char2 === char3 && char1 !== "" && char1 !== "D"){
                this.winner = char1;
                return true;
            }
        }
        return false;

    }
    checkDiagonal(){
        let lu_corner = this.cells[0].innerHTML;
        let middle = this.cells[4].innerHTML;
        let rl_corner = this.cells[8].innerHTML;
        let ru_corner = this.cells[2].innerHTML;
        let ll_corner = this.cells[6].innerHTML;

        if(lu_corner === middle && middle === rl_corner && lu_corner != "" && lu_corner !== "D"){
            this.winner = lu_corner;
            return true
        }
        if(ru_corner === middle && middle === ll_corner && ru_corner != "" && ru_corner !== "D"){
            this.winner = ru_corner;
            return true;
        }
        return false;
    }
    isFull(){
        for(let i=0; i < 9; i++){
            if(this.cells[i].innerHTML === ""){
                return false;
            }
        }
        this.fullBoard = true;
        return true;
    }
    disableBoard(){
        this.isGameActive = false;
        this.game.classList.add("complete")
    }
    isGameOver(){
        if(this.isGameActive){
            const hasWinner = this.checkRows() || this.checkCols() || this.checkDiagonal();
            const fullBoard = this.isFull();
            if(hasWinner || fullBoard){
                this.modalMsg.innerHTML = hasWinner ? `${this.winner} WINS!! 🎉` : "DRAW!!";
                this.modal.style.display = "block";
                if(!this.winner){
                    this.winner = "D";
                }
                return true;
            }
            return false;
        }
    }
    highlightBoard(){
        this.cells.forEach(function(cell){
            cell.style["background-color"] = "yellow";
        })
        this.board.classList.add("active");
        this.modal.style.display = "none";
    }
    unHighlightBoard(){
        this.cells.forEach(function(cell){
            cell.style["background-color"] = "white";
        })
        this.board.classList.remove("active");
        this.modal.style.display = "block";
    }
}

class SuperTicTacToe{
    constructor(){
        this.board1 = new TicTacToe("game0");
        this.board2 = new TicTacToe("game1");
        this.board3 = new TicTacToe("game2");
        this.board4 = new TicTacToe("game3");
        this.board5 = new TicTacToe("game4");
        this.board6 = new TicTacToe("game5");
        this.board7 = new TicTacToe("game6");
        this.board8 = new TicTacToe("game7");
        this.board9 = new TicTacToe("game8");
        this.superBoard = new TicTacToe("game9");     
        this.boards = [
            this.board1,
            this.board2,
            this.board3,
            this.board4,
            this.board5,
            this.board6,
            this.board7,
            this.board8,
            this.board9,
            this.superBoard
        ]
        this.bigModal = document.querySelector("#superboardmodal");
        this.bigModalMsg = document.querySelector("#superboardmodal .result_msg");
        this.playAgainBtn = document.querySelector("#play-again");
        this.initializeGame();
    }
    initializeGame(){
        this.bigModal.style.display = "none";
        this.bigModalMsg.innerHTML = "";
        this.currentMove = "X";
        let randomCoord = Math.floor(Math.random() * 9);
        this.currentBoard = this.boards[randomCoord];
        this.validBoardIds = [
            this.currentBoard.board.id
        ];
        this.unHighlightBoards()
        this.currentBoard.highlightBoard();
        this.handleBoardClick();
        this.handlePlayAgainBtn();
    }
    unHighlightBoards(){
        this.boards.forEach(function(board){
            board.unHighlightBoard();
        })
    }
    handleBoardClick(){
        this.boards.forEach((board) => {
            board.cells.forEach((cell) => {
                cell.addEventListener('click', () => {
                    if(this.superBoard.isGameActive){
                        this.handleGameMove(cell);
                    }
                })
            })
        });
    }

    handlePlayAgainBtn(){
        this.playAgainBtn.addEventListener("click", () => {
            this.boards.forEach((board) => {
                board.clearBoard();
                board.initializeBoard();
            })
            this.playAgainBtn.style.display = "none";
            this.initializeGame();
        })
    }
    placeCharOnSuperBoard(clickedCellId){
        let superBoardCoord = this.superBoard.board.querySelector(`td#cell${clickedCellId}`);
        this.superBoard.placeChar(superBoardCoord, this.currentBoard.winner);
        if(this.superBoard.isGameOver()){
            this.superBoard.disableBoard();
            this.playAgainBtn.style.display = "block";
        }
    }
    updateBoardState(nextBoardId){
        this.currentMove = this.currentMove === 'X' ?  'O' : 'X';
        this.currentBoard = this.boards[nextBoardId];
        this.validBoardIds = []
        if(this.currentBoard.isFull()){
            this.boards.forEach((board) => {
                this.validBoardIds.push(board.board.id)
                board.highlightBoard();
            })
        }else{
            this.validBoardIds.push(this.currentBoard.board.id);
            this.currentBoard.highlightBoard();
        }
    }
    handleGameMove(cell){
        let clickedBoardId = cell.dataset["board"];
        if(this.validBoardIds.includes(clickedBoardId) && cell.innerHTML === ""){
            this.currentBoard = this.boards[clickedBoardId];
            this.currentBoard.placeChar(cell, this.currentMove);
            if(this.currentBoard.isGameOver()){
                this.currentBoard.disableBoard();
                this.placeCharOnSuperBoard(clickedBoardId);
            }
            this.unHighlightBoards()
            if(this.superBoard.isGameActive){
                this.updateBoardState(cell.dataset["coord"])
            }else{
                this.endGame();
            }
        }
    }
    endGame(){
        this.boards.forEach((board) => {
            board.disableBoard();
            this.bigModalMsg.innerHTML = this.superBoard.modalMsg.innerHTML;
            this.bigModal.style.display = "block";

        })
    }
}

//To DO:
// set opacity to 1 when board is active
// refactor, prettier
// comment
// ability to x out final modal

game = new SuperTicTacToe();