"use strict";

function Tentacle(canvas, x) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");

  this.size = 30;
  this.x = x;
  this.y = 0;
  this.speed = 1;
}

// to add tentacles
Tentacle.prototype.draw = function() {
  this.ctx.fillStyle = "green";

  // fillRect(x, y, width, height)
  this.ctx.fillRect(this.x, this.y, this.size, this.size);
};

// to set automatic tentacle movement
Tentacle.prototype.move = function() {
    this.y = this.y + this.speed;
};

// to check if tentacles reached the bottom of the screen
Tentacle.prototype.reachBottom = function (tentacle) {
    var tentacleBottom = tentacle.y + tentacle.size;
    var bottomOfScreen = this.canvas.height - tentacle.size

    // below is a check to not consider tentacles destroyed by cannonballs which are sent below this point
    var passBottomOfScreen = this.canvas.height + tentacle.size

    if (tentacleBottom > bottomOfScreen && tentacleBottom < passBottomOfScreen) {
        return true
    }

}
