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
        this.is_game_active = true;
        this.winner = "";
        this.fullBoard = false;
    }
    clear_board(){
        this.cells.forEach(function(value){
            value.innerHTML = "";
        })
        this.game.classList.remove("complete")
        this.modal.style.display = "none";
    }
    place_char(cell, char){
        if(cell.innerHTML === ""){
            cell.innerHTML = char;
        }

    }
    horizontal_check(){
        for(let row=0; row < 9; row+=3){
            let char1 = this.cells[row].innerHTML;
            let char2 = this.cells[row+1].innerHTML;
            let char3 = this.cells[row+2].innerHTML;
            if(char1 === char2 && char2 === char3 && char1 !== "" && char1 !== "D"){
                return true;
            }
        }
        return false;
    }
    vertical_check(){
        for(let i=0; i < 3; i++){
            let char1 = this.cells[i].innerHTML;
            let char2 = this.cells[i+3].innerHTML;
            let char3 = this.cells[i+6].innerHTML;

            if(char1 === char2 && char2 === char3 && char1 !== "" && char1 !== "D"){
                return true;
            }
        }
        return false;

    }
    diagonal_check(){
        let lu_corner = this.cells[0].innerHTML;
        let middle = this.cells[4].innerHTML;
        let rl_corner = this.cells[8].innerHTML;
        let ru_corner = this.cells[2].innerHTML;
        let ll_corner = this.cells[6].innerHTML;

        if(lu_corner === middle && middle === rl_corner && lu_corner != "" && lu_corner !== "D"){
            return true
        }
        if(ru_corner === middle && middle === ll_corner && ru_corner != ""){
            return true;
        }
        return false;
    }
    is_full(){
        //CHEATING WITH HARDCODED LENGTH!!!
        for(let i=0; i < 9; i++){
            // console.log(this.cells[i].innerHTML);
            if(this.cells[i].innerHTML === ""){
                return false;
            }
        }
        this.fullBoard = true;
        return true;
    }
    disableBoard(){
        this.is_game_active = false;
        this.game.classList.add("complete")
    }
    isBoardComplete(char){
        if(this.is_game_active){
            const winner = this.horizontal_check() || this.vertical_check() || this.diagonal_check();
            const full_board = this.is_full();
            if(winner || full_board){
                this.disableBoard();
                this.modalMsg.innerHTML = winner ? `${char} WINS!!` : "DRAW!!";
                this.modal.style.display = "block";
                this.winner = winner ? char : "D";
                return true;
            }
            return false;
        }
    }
    highlightBoard(){
        this.cells.forEach(function(cell){
            cell.style["background-color"] = "yellow";
        })
    }
    unHighlightBoard(){
        this.cells.forEach(function(cell){
            cell.style["background-color"] = "white";
        })
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
        this.initializeGame();
    }
    initializeGame(){
        this.bigModal.style.display = "none";
        this.bigModalMsg.innerHTML = "";
        this.whose_move = "X";
        let randomInt = Math.floor(Math.random() * 9);
        this.currentBoard = this.boards[randomInt];
        this.unHighlightBoards()
        this.currentBoard.highlightBoard();
        this.validBoardIds = [
            this.currentBoard.board.id
        ];
        const self = this;
        this.boards.forEach(function(board){
            board.cells.forEach(function(cell){
                cell.addEventListener('click', function(){
                    if(self.superBoard.is_game_active){
                        self.move(cell);
                    }
                })
            })
        });
        this.playAgainBtn = document.querySelector("#play-again");
        this.playAgainBtn.addEventListener("click", function(){
            self.boards.forEach(function(board){
                board.clear_board();
                board.initializeBoard();
            })
            self.playAgainBtn.style.display = "none";
            self.initializeGame();
        })
    }
    unHighlightBoards(){
        this.boards.forEach(function(board){
            board.unHighlightBoard();
        })
    }
    move(cell){
        let clickedBoardId = cell.dataset["board"];
        if(this.validBoardIds.includes(clickedBoardId) && cell.innerHTML === ""){
            this.currentBoard = this.boards[clickedBoardId];
            this.currentBoard.place_char(cell, this.whose_move);
            if(this.currentBoard.isBoardComplete(this.whose_move)){
                let superBoardCoord = this.superBoard.board.querySelector(`td#cell${cell.dataset["board"]}`);
                this.superBoard.place_char(superBoardCoord, this.currentBoard.winner);
                if(this.superBoard.isBoardComplete(this.currentBoard.winner)){
                    this.playAgainBtn.style.display = "block";
                }
            }
            this.unHighlightBoards()
            if(this.superBoard.is_game_active){
                this.whose_move = this.whose_move === 'X' ?  'O' : 'X';
                this.currentBoard = this.boards[cell.dataset["coord"]];
                this.validBoardIds = []
                if(this.currentBoard.is_full()){
                    const self = this;
                    this.boards.forEach(function(board){
                        self.validBoardIds.push(board.board.id)
                        board.highlightBoard();
                    })
                }else{
                    this.validBoardIds.push(this.currentBoard.board.id);
                    this.currentBoard.highlightBoard();
                }
            }else{
                this.endGame();
            }
        }
    }
    endGame(){
        const self = this;
        this.boards.forEach(function(board){
            board.disableBoard();
            self.bigModalMsg.innerHTML = self.superBoard.modalMsg.innerHTML;
            self.bigModal.style.display = "block";

        })
    }
}

//To DO:
// Add hover event for boards that are done
// format modal
// refactor, prettier
// comment
//reset bigmodal
//reset game - unhighlight board, choose random board for start, set move to X
// handle three draws!!
game = new SuperTicTacToe();