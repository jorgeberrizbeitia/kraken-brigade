"use strict";

// ship construct
function Ship(canvas, yPosition) {
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");

  this.size = 50;
  this.x = 10;
  this.y = yPosition;
}

// to add ship
Ship.prototype.draw = function() {
  this.ctx.fillStyle = "black";

  // fillRect(x, y, width, height)
  this.ctx.fillRect(this.x, this.y, this.size, this.size);
};

// to move ship horizontally
Ship.prototype.move = function(event) {
  var shipLeftBorder = this.ship.x;
  var shipRightBorder = this.ship.x + this.ship.size;
  if (event.key === "ArrowRight" && shipRightBorder < this.canvas.width - 14) {
    this.ship.x = this.ship.x + 32;
  } else if (event.key === "ArrowLeft" && shipLeftBorder > 14) {
    this.ship.x = this.ship.x - 32;
  }
};
