"use strict";

function Tentacle(canvas, x) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");

  this.height = 30;
  this.width = 50;
  this.x = x;
  this.y = 0;
  this.speed = 1;
}

// to add tentacles
Tentacle.prototype.draw = function() {
  this.ctx.fillStyle = "green";

  // fillRect(x, y, height, width)
  this.ctx.fillRect(this.x, this.y, this.height, this.width);
};

// to set automatic tentacle movement
Tentacle.prototype.move = function() {
    this.y = this.y + this.speed;
};

// to check if tentacles reached the bottom of the screen
Tentacle.prototype.reachBottom = function (tentacle) {
    var tentacleBottom = tentacle.y + tentacle.height;
    var bottomOfScreen = this.canvas.height - 50

    // below is a check to not consider tentacles destroyed by cannonballs which are sent below this point
    var passBottomOfScreen = this.canvas.height + tentacle.height

    if (tentacleBottom > bottomOfScreen && tentacleBottom < passBottomOfScreen) {
        return true
    }
}


Tentacle.prototype.tentacleStack = function(stackedTentacle) {
    var tentacleLeft = this.x;
    var tentacleRight = this.x + this.size;
    var tentacleTop = this.y;
    var tentacleBottom = this.y + this.size;

    var stackedTentacleLeft = tentacle.x;
    var stackedTentacleRight = tentacle.x + tentacle.width;
    var stackedTentacleTop = tentacle.y;
    var stackedTentacleBottom = tentacle.y + tentacle.height;

    var crossRight = tentacleLeft <= stackedTentacleRight && tentacleRight >= stackedTentacleLeft;
    var crossLeft = tentacleRight >= stackedTentacleLeft && tentacleLeft <= stackedTentacleRight;
    var crossTop = tentacleBottom >= stackedTentacleTop && tentacleTop <= stackedTentacleBottom;
    var crossBottom = tentacleBottom <= stackedTentacleBottom && tentacleBottom >= stackedTentacleTop;
  
    if ((crossLeft || crossRight) && (crossTop || crossBottom)) {
      return true;
    }
  
    return false;
  };