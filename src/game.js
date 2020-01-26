"use strict";

// to create Game construct
function Game() {
  this.canvas = null;
  this.ctx = null;

  this.ship = null;
  this.ship2 = null;
  this.shipArr = [];
  this.tentacleArr = [];
  this.cannonballArr = [];

  this.shootDelay = false;

  this.scoreBoard = 0;
  this.score = 0;

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

  this.scoreBoard = this.gameScreen.querySelector(".score .value");

  this.canvas.setAttribute("width", containerWidth);
  this.canvas.setAttribute("height", containerHeight);

  // add initial ship
  this.ship = new Ship(this.canvas, (this.canvas.height - 50));

    // shoot cannonball with Arrow Up keydown
  this.handleKeyDown = function(event) {
    console.log("before the event", this.shootDelay);

    if (event.key === "ArrowUp" && !this.shootDelay) {
      var currentShipPosition = this.ship.x + this.ship.size / 4;
      var newCannonball = new Cannonball(this.canvas, currentShipPosition);

      this.cannonballArr.push(newCannonball);

    //   this.shootDelay = true;
    //   console.log("after the change", this.shootDelay);

    //   function setDelay() {
    //     this.shootDelay = false;
    //     console.log("after the delay", this.shootDelay);
    //   }

    //   var timerId = setTimeout(setDelay, 2000);

    //   console.log("after the handlekeydown", this.shootDelay);
    }
  };

  // keydown event listeners (with bind fix)
  window.addEventListener("keydown", this.ship.move.bind(this));
  window.addEventListener("keydown", this.handleKeyDown.bind(this));

  // start the game loop
  this.startLoop();
};

// GAME LOOP
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
    if (this.cannonballArr.length > 0 && this.tentacleArr.length > 0) {
      this.checkCannonballHit();
    }

    // 5. check if tentacles collided with (bottom - ship size)
    this.checkTentacleReachBottom();

    // 6. calculate score
    this.calculateScore();
    this.scoreBoard.innerHTML = this.score;

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

    // ANIMATE LOOP ONLY IF GAME IS NOT OVER YET
    if (!this.gameIsOver) {
      requestAnimationFrame(loop);
    }
  }.bind(this);

  // request animation frame (loop)
  loop();
};

// to check collisions between all cannonballs and all tentacles
Game.prototype.checkCannonballHit = function() {
  this.tentacleArr.forEach(function(tentacle) {
    // var tentacle = tentacleArr[x]
    this.cannonballArr.forEach(function(cannonball) {
      // var cannonball = cannonballArr[x]
      if (cannonball.cannonballHit(tentacle)) {
        tentacle.y = this.canvas.height + tentacle.size;
        cannonball.y = 0 - cannonball.size;
        // extra points for killing tentacles
        this.score = this.score + 200;
      }
    }, this);
  }, this);
};

// to add tentacles to the screen
Game.prototype.checkTentacleReachBottom = function() {
  this.tentacleArr.forEach(function(tentacle) {
    if (tentacle.reachBottom(tentacle)) {
      this.gameOver();
    }
  }, this);
};

// to calculate the score
Game.prototype.calculateScore = function() {
  this.score++;
};

// to check possible game over scenario
Game.prototype.gameOver = function() {
  this.gameIsOver = true;

  console.log("game is over in game");

  // callback function being called after the game is over
  this.startOver();
};

// call over function
Game.prototype.passGameOverCallback = function(gameOverFunc) {
  this.startOver = gameOverFunc;
};
