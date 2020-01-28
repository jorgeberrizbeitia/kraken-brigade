"use strict";

// tentacle construct
function Tentacle(canvas, x) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");

  this.height = 50;
  this.width = 25;
  this.x = x;
  this.y = 0;
  this.speed = 3;
}

// tentacle draw
Tentacle.prototype.draw = function() {
  this.ctx.fillStyle = "green";

  // fillRect(x, y,width, height)
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
};

// tentacle automatic movement
Tentacle.prototype.move = function() {
  this.y = this.y + this.speed;
};

// to check if tentacles reached the bottom of the screen
Tentacle.prototype.reachBottom = function(tentacle) {
  // variables for easier reading
  var tentacleBottom = tentacle.y + tentacle.height;
  var bottomOfScreen = this.canvas.height;

  // below is a check to not consider tentacles destroyed by cannonballs which are sent below this point
  var passBottomOfScreen = this.canvas.height + tentacle.height;

  // collision check
  if (
    tentacleBottom >= bottomOfScreen &&
    tentacleBottom <= passBottomOfScreen
  ) {
    return true;
  }
};

// to check if tentacles stacked on top of another tentacle
Tentacle.prototype.tentacleStack = function(stackedTentacle) {
  // variables for easier reading
  var tentacleLeft = this.x;
  var tentacleRight = this.x + this.width;
  var tentacleTop = this.y;
  var tentacleBottom = this.y + this.height + 10;

  // variables for easier reading
  var stackedTentacleLeft = stackedTentacle.x;
  var stackedTentacleRight = stackedTentacle.x + stackedTentacle.width;
  var stackedTentacleTop = stackedTentacle.y;
  var stackedTentacleBottom = stackedTentacle.y + stackedTentacle.height;

  // checks in variables for easier reading
  var crossRight =
    tentacleLeft <= stackedTentacleRight &&
    tentacleRight >= stackedTentacleLeft;
  var crossLeft =
    tentacleRight >= stackedTentacleLeft &&
    tentacleLeft <= stackedTentacleRight;
  var crossTop =
    tentacleBottom >= stackedTentacleTop &&
    tentacleTop <= stackedTentacleBottom;
  var crossBottom =
    tentacleBottom <= stackedTentacleBottom &&
    tentacleBottom >= stackedTentacleTop;

  // collision check
  if ((crossLeft || crossRight) && (crossTop || crossBottom)) {
    return true;
  }

  return false;
};
