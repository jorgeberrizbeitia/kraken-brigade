"use strict";

// to create Game construct
function Game() {
  this.canvas = null;
  this.ctx = null;

  this.tentacleArr = [];
  this.ship = null;
  this.cannonballArr = [];

  this.gameIsOver = false;
  this.gameScreen = null;
}

// to start game
Game.prototype.start = function() {
  // canvas creation
  this.canvasContainer = document.querySelector(".canvas-container");
  this.canvas = this.canvasContainer.querySelector("canvas");
  this.ctx = this.canvas.getContext("2d");

  var containerWidth = this.canvasContainer.offsetWidth;
  var containerHeight = this.canvasContainer.offsetHeight;

  this.canvas.setAttribute("width", containerWidth);
  this.canvas.setAttribute("height", containerHeight);

  // add initial ship
  this.ship = new Ship(this.canvas);

  // shoot cannonball keydown
  this.handleKeyDown = function(event) {
    if (event.key === "ArrowUp") {
      var currentShipPosition = this.ship.x + this.ship.size / 4;
      var newCannonball = new Cannonball(this.canvas, currentShipPosition);

      this.cannonballArr.push(newCannonball);
    }
  };

  // keydown event listeners (with bind fix)
  window.addEventListener("keydown", this.ship.move.bind(this));
  window.addEventListener("keydown", this.handleKeyDown.bind(this));

  // start the game loop
  this.startLoop();
};

// to start game loop
Game.prototype.startLoop = function() {
  var loop = function() {

    // 1. create enemies randomly
    if (Math.random() > 0.99) {
      var randomPosition = this.canvas.width * Math.random();
      var newTentacle = new Tentacle(this.canvas, randomPosition);

      this.tentacleArr.push(newTentacle);
    }

    // 2. move enemies
    this.tentacleArr.forEach(function(element) {
      element.move();
    });

    // 3. move cannonballs
    this.cannonballArr.forEach(function(element) {
        element.move();
      });

    // 4. check if cannonballs collided with enemies

    // 5. check if tentacles collided with (bottom - ship size)

    // 6. check if cannonballs are out of the screen

    // CLEAR THE CANVAS
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // UPDATE THE CANVAS
    // 1. draw the ship
    this.ship.draw();

    // 2. draw tentacles
    this.tentacleArr.forEach(function(element) {
      element.draw();
    });

    // 3. draw cannonballs
    this.cannonballArr.forEach(function(element) {
      element.draw();
    });

    // ANIMATE LOOP IF GAME IS NOT OVER YET
    if (!this.gameIsOver) {
      requestAnimationFrame(loop);
    }
  }.bind(this);

  // request animation frame (loop)
  loop();
};

// to check all possible collisions
Game.prototype.checkCollision = function() {};

// to add tentacles to the screen
Game.prototype.addTentacle = function() {};

Game.prototype.clearCanvas = function() {};

Game.prototype.updateCanvas = function() {};

Game.prototype.drawCanvas = function() {};

// to check possible game over scenarios
Game.prototype.GameOver = function() {};
