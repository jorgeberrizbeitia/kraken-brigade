"use strict";

// ship construct
function Ship(canvas, yPosition) {
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");

  this.size = 50;

  this.x = 10;
  this.y = yPosition;

  this.direction = 0;
  this.speed = 5;

  this.canShoot = true;
  this.canMove = true;

  this.shipImage = new Image();
  this.shipImage.src = './img/ship-right-canshoot.png'
}

// to add ship
Ship.prototype.draw = function(color) {
//   this.ctx.fillStyle = color;

  // fillRect(x, y, width, height)
  this.ctx.drawImage(this.shipImage, this.x, this.y, this.size, this.size)
//   this.ctx.fillRect(this.x, this.y, this.size, this.size);
};

// to change direction based on keydown
Ship.prototype.setDirection = function(direction) {
  // +1 down  -1 up
  if (direction === "left") this.direction = -1;
  else if (direction === "right") this.direction = 1;
  else if (direction === "stop") this.direction = 0;
};

// automatic movement inside game loop
Ship.prototype.updatePosition = function() {
  this.x = this.x + this.direction * this.speed; //  + 5   - 5
};

// automatic direction change based on screen collision
Ship.prototype.handleScreenCollision = function() {
  var screenLeft = 0;
  var screenRight = this.canvas.width;

  if (this.x + this.size > screenRight) {
    this.direction = -1;
  } else if (this.x < screenLeft) {
    this.direction = 1;
  }
};