class TicTacToe{
    constructor(id){
        this.board = document.querySelector(`#${id} .board`);
        this.cells = document.querySelectorAll(`#${id} td`);
        this.modal = document.querySelector(`#${id} .modal`);
        this.modalMsg = document.querySelector(`#${id} .modal .result_msg`);
        const self = this;
        this.playAgainBtn = document.querySelector("#play-again");
        this.playAgainBtn.addEventListener("click", function(){
            self.clear_board();
        })
        this.is_board_active = false;
        this.is_game_active = true;
        this.winner = "";
    }

    clear_board(){
        this.cells.forEach(function(value){
            value.innerHTML = "";
        })
        this.board.style.opacity = 1;
        this.modal.style.display = "none";
        this.playAgainBtn.style.display = "none";
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
            if(char1 === char2 && char2 === char3 && char1 !== ""){
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

            if(char1 === char2 && char2 === char3 && char1 !== ""){
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

        if(lu_corner === middle && middle === rl_corner && lu_corner != ""){
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
            if(this.cells[i].innerHTML === ""){
                return false;
            }
        }
        return true;
    }
    end_game(){
        this.is_game_active = false;
        this.board.style.opacity = 0.2;
    }
    check_board(char){
        if(this.is_game_active){
            const winner = this.horizontal_check() || this.vertical_check() || this.diagonal_check();
            const full_board = this.is_full();
            if(winner || full_board){
                this.end_game();
                this.modalMsg.innerHTML = winner ? `${char} WINS!!` : "DRAW!!";
                this.modal.style.display = "block";
                this.playAgainBtn.style.display = "block";
                this.winner = char;
                return true;
            }
            return false;
        }
        // let winner = ""
        // if(!this.winner){
        //     const winner = this.horizontal_check() || this.vertical_check() || this.diagonal_check();
        // }
        // const full_board = this.is_full();
        // if(winner || full_board){
        //     this.end_game();
        //     this.modalMsg.innerHTML = winner ? `${char} WINS!!` : "DRAW!!";
        //     this.modal.style.display = "block";
        //     this.playAgainBtn.style.display = "block";
        // }
    }
    // move(cell){
    //     if(this.is_game_active){
    //         this.place_char(cell)
    //         this.check_board()
    //         this.whose_move = this.whose_move === 'X' ?  'O' : 'X';
    //     }
    // }
}

class SuperTicTacToe{
    constructor(){
        this.board1 = new TicTacToe("game1");
        this.board2 = new TicTacToe("game2");
        this.board3 = new TicTacToe("game3");
        this.board4 = new TicTacToe("game4");
        this.board5 = new TicTacToe("game5");
        this.board6 = new TicTacToe("game6");
        this.board7 = new TicTacToe("game7");
        this.board8 = new TicTacToe("game8");
        this.board9 = new TicTacToe("game9");
        
        this.boards = [
            this.board1,
            this.board2,
            this.board3,
            this.board4,
            this.board5,
            this.board6,
            this.board7,
            this.board8,
            this.board9
                        ]
        this.initializeGame();
        this.superBoard = new TicTacToe("game10");
        //intialize game -> select random board
        // move -> set random board chosen to active, do a move on that boards move class
        // create one more board that represents the entire BOARD
        // add to that board when a game is done
    }
    initializeGame(){
        console.log("here");
        this.whose_move = "X";
        this.currentBoard = this.board1;
        console.log(this.currentBoard.board.id);
        const self = this;
        this.boards.forEach(function(board){
            board.cells.forEach(function(cell){
                cell.addEventListener('click', function(){self.move(cell)})
            })
        });
    }

    move(cell){
        console.log("here")
        console.log(cell);
        if(this.currentBoard.board.id === cell.dataset["board"]){
            console.log("here!!!!!")
            this.currentBoard.place_char(cell, this.whose_move);
            if(this.currentBoard.check_board(this.whose_move)){
                let superCell = this.superBoard.board.querySelector(`td#cell${cell.dataset["board"]}`);
                this.superBoard.place_char(superCell, this.currentBoard.winner);
                this.superBoard.check_board(this.currentBoard.winner);
            }
            this.whose_move = this.whose_move === 'X' ?  'O' : 'X';
            let target = cell.dataset["coord"] - 1;
            console.log(target);
            this.currentBoard = this.boards[target];
        }
    }

}

game = new SuperTicTacToe();