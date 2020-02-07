class TicTacToe{
    constructor(id){
        this.board = document.querySelectorAll(`#${id} td`);
        this.modal = document.querySelector(`#${id} .modal`);
        this.modalMsg = document.querySelector(`#${id} .modal .result_msg`);
        const self = this;
        this.board.forEach(function (cell){
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
        this.board.forEach(function(value){
            value.innerHTML = "";
        })
        let board = document.querySelector(".board");
        board.style.opacity = 1;
        this.modal.style.display = "none";
    }
    place_char(cell){
        if(cell.innerHTML === ""){
            cell.innerHTML = this.whose_move;
        }

    }
    horizontal_check(){
        for(let row=0; row < 9; row+=3){
            let char1 = this.board[row].innerHTML;
            let char2 = this.board[row+1].innerHTML;
            let char3 = this.board[row+2].innerHTML;
            if(char1 === char2 && char2 === char3 && char1 !== ""){
                return true;
            }
        }
        return false;
    }
    vertical_check(){
        for(let i=0; i < 3; i++){
            let char1 = this.board[i].innerHTML;
            let char2 = this.board[i+3].innerHTML;
            let char3 = this.board[i+6].innerHTML;

            if(char1 === char2 && char2 === char3 && char1 !== ""){
                return true;
            }
        }
        return false;

    }
    diagonal_check(){
        let lu_corner = this.board[0].innerHTML;
        let middle = this.board[4].innerHTML;
        let rl_corner = this.board[8].innerHTML;
        let ru_corner = this.board[2].innerHTML;
        let ll_corner = this.board[6].innerHTML;

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
            if(this.board[i].innerHTML === ""){
                return false;
            }
        }
        return true;
    }
    end_game(){
        this.is_game_active = false;
        let board = document.querySelector(".board");
        board.style.opacity = 0.2;
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