//Funcion anonima del primer objeto modelo del Board
(function(){
    self.Board = function(width, height){
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
        this.playing = false;
        
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

//Funcion de la pelota, constructor
(function(){
    self.Ball = function(x,y,radius,board){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed_y = 0;
        this.speed_x = 3;
        this.board = board;
        this.direction = 1;
        this.bounce_angle = 0;
        this.max_bounce_angle = Math.PI / 12;
        this.speed = 3;

        board.ball = this;
        this.kind = "circle";        
    }


    //Funcion para mover la pelota
    self.Ball.prototype = {
        move: function(){
            this.x += (this.speed_x * this.direction);
            this.y += (this.speed_y);
        },

        get width(){
            return this.radius * 2;
        },

        get height(){
            return this.radius * 2;
        },

//Constructor de la clase Bar
(function(){
    self.Bar = function(x,y,width, height, board){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.board.bars.push(this);
        this.kind = "rectangle";
        this.speed = 10;
        
    }

    //Para mover las barras
    self.Bar.prototype = {
        down: function(){
            this.y += this.speed;
        },
        up: function(){
            this.y -= this.speed;
        },
        toString: function(){
            return "x: "+this.x+" y: "+this.y;
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

    self.BoardView.prototype={
        draw: function(){
            for (var i = this.board.elements.length -1; i >= 0; i--) {
                var el = this.board.elements[i];

                draw(this.context,el);
            };
        }
    },

    check_collitions: function(){
        for (var i = this.board.bars.length -1; i >= 0; i--) {
            var bar = this.board.bars[i];
            if(hit(bar, this.board.ball))
            {
                this.board.ball.collition(bar);
            }
            
        };
    },

      //Metodo para jugar, limpia y dibuja el board
      play: function(){
        if(this.board.playing){
            this.clean();
            this.draw();
            this.check_collitions();
            this.board.ball.move();
        }            
    }
}

     //Funcion que dibuja el board
     function draw(context,element){
        switch(element.kind){
            case "rectangle":
                context.fillRect(element.x,element.y, element.width,element.height);
                break;
        }
    }
})();



self.addEventListener("load",main);

function main(){
    
    var board = new Board(800,400);
    var bar = new Bar(20,100,20,100,board);
    var bar_2 = new Bar(760,100,20,100,board);
    var canvas = document.getElementById('canvas');
    var board_view = new BoardView(canvas,board);
    var ball = new Ball(300, 100, 10, board);

//Configuracion para mover la barra
document.addEventListener("keydown", function(ev){

    if(ev.keyCode == 87){
        //W
        bar.up();
    }
    else if(ev.keyCode == 83){
        //S
        bar.down();
    }
    if(ev.keyCode === 38){
        //up
        bar_2.up();
    }
    else if(ev.keyCode === 40){
        //down
        bar_2.down();

});
}