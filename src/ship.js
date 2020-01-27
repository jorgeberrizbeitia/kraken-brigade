"use strict";

// ship construct
function Ship(canvas, yPosition) {
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");

  this.size = 50;
  this.x = 10;
  this.y = yPosition;

  this.canShoot = true;
  this.canMove = true;
}

// to add ship
Ship.prototype.draw = function(color) {
  this.ctx.fillStyle = color;

  // fillRect(x, y, width, height)
  this.ctx.fillRect(this.x, this.y, this.size, this.size);
};

// to move ship horizontally to the right
Ship.prototype.moveRight = function() {
  var shipRight = this.x + this.size;
  if (shipRight < this.canvas.width - 14) {
    this.x = this.x + 32;
  }
};

// to move ship horizontally to the left
Ship.prototype.moveLeft = function() {
  var shipLeft = this.x;
  if (shipLeft > 14) {
    this.x = this.x - 32;
  }
};

Ship.prototype.isShipCollidingWithTentacle = function(stackedTentacle) {
  // WORKING ON THIS!!!*********************************************************************************

  var shipLeft = this.x;
  var shipRight = this.x + this.size;
//   var shipTop = this.y;
//   var shipBottom = this.y + this.size;

  var stackedTentacleLeft = stackedTentacle.x;
  var stackedTentacleRight = stackedTentacle.x + stackedTentacle.width;
//   var stackedTentacleTop = stackedTentacle.y;
//   var stackedTentacleBottom = stackedTentacle.y + stackedTentacle.height;

  var crossRight =
    shipLeft <= stackedTentacleRight && shipRight >= stackedTentacleLeft;
  var crossLeft =
    shipRight >= stackedTentacleLeft && shipLeft <= stackedTentacleRight;
//   var crossTop =
//     shipBottom >= stackedTentacleTop && shipTop <= stackedTentacleBottom;
//   var crossBottom =
//     shipBottom <= stackedTentacleBottom && shipBottom >= stackedTentacleTop;

//   if ((crossLeft || crossRight) && (crossTop || crossBottom)) {
    if (crossLeft || crossRight) {
    return true;
  }

  return false;
};
