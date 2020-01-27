"use strict";

// to create Game construct
function Game() {
  this.canvas = null;
  this.ctx = null;

  this.ship = null;
  this.ship2 = null;
  this.shipArr = [];
  this.tentacleArr = [];
  this.stackedTentacleArr = [];
  this.cannonballArr = [];

  this.selectedShip = 0; // current controlled ship

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

  // add initial ships and push into ship array
  this.ship = new Ship(this.canvas, this.canvas.height - 50);
  this.shipArr.push(this.ship);
  this.ship2 = new Ship(this.canvas, this.canvas.height - 110);
  this.shipArr.push(this.ship2);

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
        randomPosition = 10;
      } else if (randomCalc > this.canvas.width - 50) {
        randomPosition = this.canvas.width - 50;
      } else {
        randomPosition = randomCalc;
      }

      // to create new tentacle and add to their array
      var newTentacle = new Tentacle(this.canvas, randomPosition);
      this.tentacleArr.push(newTentacle);
    }

    // 2. move tentacles
    this.tentacleArr.forEach(function(element) {
    //   var indexOfTentacle = this.tentacleArr.indexOf(element);
      if (element.y + element.height < this.canvas.height) {
        // TEST FOR TENTACLE STOPPING WHEN HITTING THE BOTTOM
        element.move();
        //   } else {
        //       this.tentacleArr.splice(indexOfTentacle, 1)
        //       this.stackedTentacleArr.push(this.tentacleArr[indexOfTentacle])
        //       console.log(this.stackedTentacleArr)
      }
    }, this);

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
      element.draw("black");
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

    // TO ANIMATE LOOP ONLY IF GAME IS NOT OVER YET
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
        tentacle.y = this.canvas.height + tentacle.height;
        cannonball.y = 0 - cannonball.size;
        // extra points for killing tentacles
        this.score = this.score + 200;
      }
    }, this);
  }, this);
};

Game.prototype.checkTentacleStack = function() {
  this.stackedTentacleArr.forEach(function(stackedTentacle) {
    this.tentacleArr.forEach(function(tentacle) {
      if (tentacle.tentacleStack(stackedTentacle)) {
        // TENTACLE COLLIDE WITH STACKED. TO BE ADDED
      }
    });
  });
};

// to add tentacles to the screen
Game.prototype.checkTentacleReachBottom = function() {
  this.tentacleArr.forEach(function(tentacle) {
    var indexOfTentacle = this.tentacleArr.indexOf(tentacle);
    if (tentacle.reachBottom(tentacle)) {
      this.tentacleArr.splice(indexOfTentacle, 1);
      this.stackedTentacleArr.push(this.tentacleArr[indexOfTentacle]);
      console.log(this.stackedTentacleArr);
      // DISABLED WHILE STACK TEST IS ONGOING
      //   this.gameOver();
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

Game.prototype.shootCannonballs = function() {
  if (!this.shipArr[this.selectedShip].shootDelay) {
    // to determine which ship is shooting and its position
    var currentShipPositionX =
      this.shipArr[this.selectedShip].x +
      this.shipArr[this.selectedShip].size / 4;
    var currentShipPositionY = this.shipArr[this.selectedShip].y;

    // to create new cannonball and push into cannonballs array
    var newCannonball = new Cannonball(
      this.canvas,
      currentShipPositionX,
      currentShipPositionY
    );
    this.cannonballArr.push(newCannonball);

    // to add delay to the shoot that will be removed on a setTimeout

    this.shipArr[this.selectedShip].shootDelay = true;

    // setTimeout for the shoot delay
    var shipToAddDelay = this.selectedShip; // this variable is so the ship to add the delay doesn't change between the timout
    setTimeout(
      function() {
        this.shipArr[shipToAddDelay].shootDelay = false;
      }.bind(this),
      2000
    );
  }
};
