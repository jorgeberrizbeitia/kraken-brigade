"use strict";

// cannonball construct
function Cannonball(canvas, shipPosition) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");

  this.size = 25;
  this.x = shipPosition;
  this.y = canvas.height - 50;
  this.speed = 5;
}

// to add cannonballs when ship shoots
Cannonball.prototype.draw = function() {
  this.ctx.fillStyle = "blue";

  // fillRect(x, y, width, height)
  this.ctx.fillRect(this.x, this.y, this.size, this.size);
};

// to move cannonballs up
Cannonball.prototype.move = function() {
  this.y = this.y - this.speed;
};

// to check collision between a cannonball and a tentacle
Cannonball.prototype.cannonballHit = function(tentacle) {
  var shipLeft = this.x;
  var shipRight = this.x + this.size;
  var shipTop = this.y;
  var shipBottom = this.y + this.size;

  var tentacleLeft = tentacle.x;
  var tentacleRight = tentacle.x + tentacle.size;
  var tentacleTop = tentacle.y;
  var tentacleBottom = tentacle.y + tentacle.size;

  var crossRight = tentacleLeft <= shipRight && tentacleRight >= shipLeft;
  var crossLeft = tentacleRight >= shipLeft && tentacleLeft <= shipRight;
  var crossTop = tentacleBottom >= shipTop && tentacleTop <= shipBottom;
  var crossBottom = tentacleBottom <= shipBottom && tentacleBottom >= shipTop;

  if ((crossLeft || crossRight) && (crossTop || crossBottom)) {
    return true;
  }

  return false;
};
