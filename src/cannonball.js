"use strict";

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

// to set automatic tentacle movement
Cannonball.prototype.move = function() {
  this.y = this.y - this.speed;
};
