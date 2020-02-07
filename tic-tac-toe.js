class TicTacToe{
    constructor(id){
        this.board = document.querySelector(`#${id} .board`);
        this.cells = document.querySelectorAll(`#${id} td`);
        this.modal = document.querySelector(`#${id} .modal`);
        this.modalMsg = document.querySelector(`#${id} .modal .result_msg`);
        const self = this;
        this.cells.forEach(function (cell){
            cell.addEventListener("click", function(){self.move(cell)})
        });
        this.initializeGame();
        this.playAgainBtn = document.querySelector("#play-again");
        this.playAgainBtn.addEventListener("click", function(){
            self.clear_board();
            self.initializeGame();
        })
    }
    initializeGame(){
        this.whose_move = "X";
        this.is_game_active = true;
    }
    clear_board(){
        this.cells.forEach(function(value){
            value.innerHTML = "";
        })
        this.board.style.opacity = 1;
        this.modal.style.display = "none";
        this.playAgainBtn.style.display = "none";
    }
    place_char(cell){
        if(cell.innerHTML === ""){
            cell.innerHTML = this.whose_move;
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
    check_board(){
        const winner = this.horizontal_check() || this.vertical_check() || this.diagonal_check();
        const full_board = this.is_full();
        if(winner || full_board){
            this.end_game();
            this.modalMsg.innerHTML = winner ? `${this.whose_move} WINS!!` : "DRAW!!";
            this.modal.style.display = "block";
            this.playAgainBtn.style.display = "block";
        }
    }
    move(cell){
        if(this.is_game_active){
            this.place_char(cell)
            this.check_board()
            this.whose_move = this.whose_move === 'X' ?  'O' : 'X';
        }
    }
}

board = new TicTacToe("game1");
board = new TicTacToe("game2");
board = new TicTacToe("game3");
board = new TicTacToe("game4");
board = new TicTacToe("game5");
board = new TicTacToe("game6");
board = new TicTacToe("game7");
board = new TicTacToe("game8");
board = new TicTacToe("game9");