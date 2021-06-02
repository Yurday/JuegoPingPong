//Funcion anonima del primer objeto modelo del Board
(function(){
    self.Board = function(width, height){
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
        
    }

       //Se crea para obtener los prototipos Getter de la clase Board
       self.Board.prototype = {
        get elements(){
            var elements = this.bars;
            elements.push(ball);
            return elements;
        }
    }
})();

//Clase para dibujar las vistas del board
(function(){
    self.BoardView = function(canvas,board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d");
    }
})();

self.addEventListener("load",main);

function main(){
    console.log("Hola mundo");
    var board = new Board(800,400);
    var canvas = document.getElementById('canvas');
    var board_view = new BoardView(canvas,board);
}