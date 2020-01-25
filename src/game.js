"use strict"

// to create Game construct
function Game () {
    this.canvas = null;
    this.ctx = null;

    this.tentacles = [];
    this.ship = null;

    this.gameIsOver = false;
    this.gameScreen = null;
}

// to start game
Game.prototype.start = function () {

    // canvas creation
    this.canvasContainer = document.querySelector(".canvas-container");
    this.canvas = this.canvasContainer.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");

    var containerWidth = this.canvasContainer.offsetWidth;
    var containerHeight = this.canvasContainer.offsetHeight;
  
    this.canvas.setAttribute("width", containerWidth);
    this.canvas.setAttribute("height", containerHeight);

    // add initial ship
    this.ship = new Ship(this.canvas)

    // add keydown event listeners

    // fix for above "this" to equal "Game"

    // start the game loop
    this.startLoop();
};

// to start game loop
Game.prototype.startLoop = function () {
    var loop = function () {

        // 2. create enemies randomly

        // 3. create cannonballs

        // 4. check if cannonballs collided with enemies

        // 5. checkj if tentacles collided with (bottom - ship size)

        // 6. check if cannonballs are out of the screen

        // CLEAR THE CANVAS
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // UPDATE THE CANVAS
        // 1. draw the ship
        this.ship.draw();

        // 2. draw enemies

        // 3. draw cannonballs

        // ANIMATE LOOP IF GAME IS NOT OVER YET
        if (!this.gameIsOver) {
            requestAnimationFrame(loop);
          }
          
          console.log("loop working")

    }.bind(this);

    // request animation frame (loop)
    loop();
    
};

// to check all possible collisions
Game.prototype.checkCollision = function () {}

// to add tentacles to the screen
Game.prototype.addTentacle = function () {}

Game.prototype.clearCanvas = function () {}

Game.prototype.updateCanvas = function () {}

Game.prototype.drawCanvas = function () {}

// to check possible game over scenarios
Game.prototype.GameOver = function () {}
