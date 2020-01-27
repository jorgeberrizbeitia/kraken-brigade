"use strict";

// ship construct
function Ship(canvas, yPosition) {
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");

  this.size = 50;
  this.x = 10;
  this.y = yPosition;

  this.shootDelay = false; 
}

// to add ship
Ship.prototype.draw = function(color) {
  this.ctx.fillStyle = color;

  // fillRect(x, y, width, height)
  this.ctx.fillRect(this.x, this.y, this.size, this.size);
};

// to move ship horizontally to the right
Ship.prototype.moveRight = function() {
  var shipRightBorder = this.x + this.size;
  if (shipRightBorder < this.canvas.width - 14) {
    this.x = this.x + 32;
  }
};

// to move ship horizontally to the left
Ship.prototype.moveLeft = function() {
  var shipLeftBorder = this.x;
  if (shipLeftBorder > 14) {
    this.x = this.x - 32;
  }
};


