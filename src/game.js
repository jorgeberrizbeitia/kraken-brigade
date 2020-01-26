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

  this.selectedShip = 0;
  this.shootDelay = false; // TEST FOR ADDING SHOOT DELAY

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

  // add initial ships
  this.ship = new Ship(this.canvas, this.canvas.height - 50);
  this.ship2 = new Ship(this.canvas, this.canvas.height - 110);

  // inserting ships into their array
  this.shipArr.push(this.ship);
  this.shipArr.push(this.ship2);

  // shoot cannonball with Arrow Up keydown
  this.shootCannonballs = function() {
    console.log("before the event", this.shootDelay);

    if (!this.shootDelay) {
      // to determine which ship is shooting and its position
      var currentShipPositionX = this.shipArr[this.selectedShip].x + this.shipArr[this.selectedShip].size / 4;
      var currentShipPositionY = this.shipArr[this.selectedShip].y;

      // to create new cannonball and push into cannonballs array
      var newCannonball = new Cannonball(this.canvas, currentShipPositionX, currentShipPositionY);
      this.cannonballArr.push(newCannonball);

      // TEST FOR ADDING SHOOT DELAY

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

  // to change ship to control
  this.changeShip = function() {
    if (this.selectedShip === 1) {
      this.selectedShip = 0;
    } else {
      this.selectedShip = 1;
    }
    console.log(this.selectedShip);
  };

  // keydown event listeners
  this.keyDownEvents = function(event) {
    switch (event.key) {
      case "ArrowDown":
        this.changeShip();
        break;
      case "ArrowRight":
        this.shipArr[this.selectedShip].moveRight();
        break;
      case "ArrowLeft":
        this.shipArr[this.selectedShip].moveLeft();
        break;
      case "ArrowUp":
        this.shootCannonballs();
        break;
    }
  };
  window.addEventListener("keydown", this.keyDownEvents.bind(this));

  // start the game loop
  this.startLoop();
};

// GAME LOOP
Game.prototype.startLoop = function() {
  var loop = function() {
    // 1. create tentacles randomly
    if (Math.random() > 0.99) {
      // determine random position
      var randomPosition = 0;
      var randomCalc = this.canvas.width * Math.random();

      if (randomCalc < 10) {
          randomPosition = 10
      } else if (randomCalc > this.canvas.width - 50) {
          randomPosition = this.canvas.width - 50
      } else {
          randomPosition = randomCalc
      }

      // to create new tentacle and add to their array
      var newTentacle = new Tentacle(this.canvas, randomPosition);
      this.tentacleArr.push(newTentacle);
    }

    // 2. move tentacles
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
    this.shipArr.forEach(function(element) {
      element.draw();
    });
    // this.ship.draw();

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
