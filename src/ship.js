"use strict";

// ship construct
function Ship(canvas, yPosition) {
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");

  this.width = 80;
  this.heigth = 50;

  this.x = 10;
  this.y = yPosition;

  this.direction = 0;
  this.speed = 3;

  this.canShoot = true;
  // this.canMove = true;
  // diferent types of ship images
  this.imageRightGreen = "./img/ship-right-canshoot.png";
  this.imageLeftGreen = "./img/ship-left-canshoot.png";
  this.imageRightRed = "./img/ship-right-cantshoot.png";
  this.imageLeftRed = "./img/ship-left-cantshoot.png";

  this.shipImage = new Image();
  this.shipImage.src = this.imageRightGreen;
}

// to add ship
Ship.prototype.draw = function(shipImage) {
  //   this.ctx.fillStyle = color;

  // fillRect(x, y, width, height)
  //   this.ctx.fillRect(this.x, this.y, this.width, this.heigth);
  if (this.direction < 0 && this.canShoot === true) {
    this.shipImage.src = this.imageLeftGreen;
  } else if (this.direction < 0 && this.canShoot === false) {
    this.shipImage.src = this.imageLeftRed;
  } else if (this.direction >= 0 && this.canShoot === true) {
    this.shipImage.src = this.imageRightGreen;
  } else if (this.direction >= 0 && this.canShoot === false) {
    this.shipImage.src = this.imageRightRed;
  }
  this.ctx.drawImage(this.shipImage, this.x, this.y, this.width, this.heigth);
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

  if (this.x + this.width > screenRight) {
    this.direction = -1;
  } else if (this.x < screenLeft) {
    this.direction = 1;
  }
};

Ship.prototype.drawLine = function() {
  this.ctx.beginPath(); // Start a new path
  this.ctx.strokeStyle = "silver";
  this.ctx.moveTo(10, this.y + (this.heigth / 2));
  this.ctx.lineTo(this.canvas.width - 10, this.y + (this.heigth / 2));
  this.ctx.stroke();
};
