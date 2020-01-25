"use strict";

// ship construct
function Ship(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");

  this.x = 20;
  this.y = 20;

  this.size = 50;
}

// to add ship
Ship.prototype.draw = function() {
  this.ctx.fillStyle = "lightblue";

  this.ctx.fillRect(this.x, this.y, this.size, this.size);
};

// to move horizontally
Ship.prototype.move = function() {};

// to shoot cannonballs
Ship.prototype.shoot = function() {};
