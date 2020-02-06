// document.addEventListener("click", function(event){
//     console.log(event.target);
// })



class TicTacToe{
    constructor(){
        this.board = document.querySelectorAll("td")
        this.whose_move = "X";
        const self = this;
        this.board.forEach(function (cell){
            cell.addEventListener("click", function(){self.move(cell)})//CALL MOVE FUNCTION
        });
    }
    clear_board(){
        this.board.forEach(function(value){
            value.innerHTML = "";
        })
    }
    place_char(cell){
        if(cell.innerHTML === ""){
            cell.innerHTML = this.whose_move;
            this.whose_move = this.whose_move === 'X' ?  'O' : 'X';
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
    check_board(){
        if(this.horizontal_check() || this.vertical_check() || this.diagonal_check()){
            console.log("WINNER!!")
            //display popup
            board = document.querySelector(".board").style.opacity = 0.5;
        }
    }
    move(cell){
        this.place_char(cell)
        this.check_board()
        //did someone win
        // did they tie
    }
}

board = new TicTacToe;

// const cells = document.querySelectorAll("td")
// cells.forEach(function(cell){
//     cell.addEventListener("click", 
// })