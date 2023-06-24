const ballVelosX = [-15, 15];
const ballVelosY = [
  -7, -6.5, -6, -5.5, -5, -4.5, -4, -3.5, -3, -2.5, -2, -1.5, -1, -0.5, 0, 0.5,
  1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7
];
const positiveBallHitVelosY = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7];
const negativeBallHitVelosY = [-7, -6.5, -6, -5.5, -5, -4.5, -4, -3.5, -3, -2.5, -2, -1.5, -1, -0.5, 0];

class Pingpong {
  constructor() {
    this.canvas = document.getElementById("game");
    this.context = this.canvas.getContext("2d");
    document.addEventListener("keydown", this.onKeyDown.bind(this));
    document.addEventListener("keyup", this.onP1KeyUp.bind(this));
    document.addEventListener("keyup", this.onP2KeyUp.bind(this));
  }

  gameInit() {
    this.p1PositionX = 20;
    this.p2PositionX = 780;
    this.p1PositionY = this.p2PositionY = 210;
    this.p1veloY = this.p2veloY = 0;

    this.p1Score = this.p2Score = 0;
    this.scoreDash = "-";
    this.p1 = "player1";
    this.p2 = "player2";

    this.canMove = false;
    this.p1iskeydowntrue = this.p2iskeydowntrue = false;

    this.ballPositionX = 400;
    this.ballPositionY = 250;
    this.ballVeloX =
      ballVelosX[Math.floor(Math.random() * ballVelosX.length)] / 3;
    this.ballVeloY = ballVelosY[Math.floor(Math.random() * ballVelosY.length)];

    this.gridSize = 20;

    this.hitsound = new Audio("./media/8-bit-kit-beep.mp3")

    this.timer = setInterval(this.loop.bind(this), 1000 / 50);

  }

  roundInit() {
    this.p1PositionX = 20;
    this.p2PositionX = 780;
    this.p1PositionY = this.p2PositionY = 210;
    this.p1veloY = this.p2veloY = 0;

    this.canMove = false;
    this.p1iskeydowntrue = this.p2iskeydowntrue = false;

    this.ballPositionX = 400;
    this.ballPositionY = 250;
    this.ballVeloX =
      ballVelosX[Math.floor(Math.random() * ballVelosX.length)]/3;
    this.ballVeloY = ballVelosY[Math.floor(Math.random() * ballVelosY.length)];

    this.gridSize = 20;
    
    this.hitsound = new Audio("./media/8-bit-kit-beep.mp3");
  }

  loop() {
    this.update();
    this.draw();
  }

  gameOver() {
    alert(
      `Game Over: \r\n${this.p1}: ${this.p1Score} - ${this.p2}: ${this.p2Score}`
    );
    clearInterval(this.timer);
    game.gameInit();
  }

  update() {
    //*Movement
    if (this.canMove === true) {
      this.ballPositionX += this.ballVeloX;
      this.ballPositionY += this.ballVeloY;

      if (this.p1iskeydowntrue) {
        this.p1PositionY += this.p1veloY;
      }
      if (this.p2iskeydowntrue) {
        this.p2PositionY += this.p2veloY;
      }
    }

    //*Racket rules
    if (this.p1PositionY < 70) {
      this.p1PositionY = 70;
    }
    if (this.p1PositionY > 410) {
      this.p1PositionY = 410;
    }
    if (this.p2PositionY < 70) {
      this.p2PositionY = 70;
    }
    if (this.p2PositionY > 410) {
      this.p2PositionY = 410;
    }

    //*Ball rules
    if (this.ballPositionY - 5 <= 70) {
      this.hitsound = new Audio("./media/8-bit-kit-beep.mp3")
      this.hitsound.play();
      this.ballVeloY = -1 * this.ballVeloY;
    }
    if (this.ballPositionY + 15 >= 499) {
      this.hitsound = new Audio("./media/8-bit-kit-beep.mp3")
      this.hitsound.play();
      this.ballVeloY = -1 * this.ballVeloY;
    }
    if (
      this.ballPositionY >= this.p1PositionY - 10 &&
      this.ballPositionY < this.p1PositionY + 85 &&
      this.ballPositionX < 35
    ) {
      this.hitsound = new Audio("./media/8-bit-kit-beep.mp3")
      this.hitsound.play();
      this.ballVeloX = ballVelosX[1];
      if(this.ballVeloY <= 0){
        this.ballVeloY = negativeBallHitVelosY[Math.floor(Math.random()*negativeBallHitVelosY.length)];
      }if(this.ballVeloY >= 0){
        this.ballVeloY = positiveBallHitVelosY[Math.floor(Math.random()*negativeBallHitVelosY.length)];
      }
    }
    if (
      this.ballPositionY >= this.p2PositionY - 10 &&
      this.ballPositionY < this.p2PositionY + 85 &&
      this.ballPositionX > 755
    ) {
      this.hitsound = new Audio("./media/8-bit-kit-beep.mp3")
      this.hitsound.play();
      this.ballVeloX = ballVelosX[0];
      if(this.ballVeloY <= 0){
        this.ballVeloY = negativeBallHitVelosY[Math.floor(Math.random()*negativeBallHitVelosY.length)];
      }if(this.ballVeloY >= 0){
        this.ballVeloY = positiveBallHitVelosY[Math.floor(Math.random()*negativeBallHitVelosY.length)];
      }
    }
    //*Score tracker
    if (this.ballPositionX > 780) {
      this.p1Score++;
      this.roundInit();
    }
    if (this.ballPositionX < 20) {
      this.p2Score++;
      this.roundInit();
    }
    if (this.p1Score === 5 || this.p2Score === 5) {
      this.gameOver();
    }
  }

  draw() {
    //*Background and top
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = "white";
    this.context.fillRect(0, 68, this.gridSize + 800, this.gridSize - 19);
    //*Players' info and score
    this.context.fillStyle = "red";
    this.context.font = "20px Arial";
    this.context.fillText(this.p1Score, 380, 40);

    this.context.fillStyle = "blue";
    this.context.font = "20px Arial";
    this.context.fillText(this.p2Score, 420, 40);

    this.context.fillStyle = "white";
    this.context.font = "20px Arial";
    this.context.fillText(this.scoreDash, 403, 40);

    this.context.fillStyle = "red";
    this.context.font = "20px Arial";
    this.context.fillText(this.p1, 20, 40);

    this.context.fillStyle = "blue";
    this.context.font = "20px Arial";
    this.context.fillText(this.p2, 730, 40);
    //*Ball
    this.context.fillStyle = "white";
    this.context.fillRect(
      this.ballPositionX,
      this.ballPositionY,
      this.gridSize - 5,
      this.gridSize - 5
    );
    //*Players' rackets
    this.context.fillStyle = "red";
    this.context.fillRect(
      this.p1PositionX,
      this.p1PositionY,
      this.gridSize - 5,
      this.gridSize + 70
    );

    this.context.fillStyle = "blue";
    this.context.fillRect(
      this.p2PositionX,
      this.p2PositionY,
      this.gridSize - 5,
      this.gridSize + 70
    );
  }

  onKeyDown(e) {
    if (e.keyCode === 32 && this.canMove === false) {
      this.canMove = true;
    }
    if (e.keyCode === 38 && this.p2veloY !== -1 && !this.p2iskeydowntrue) {
      this.p2veloY = -9;
      this.p2iskeydowntrue = true;
    }
    if (e.keyCode === 40 && this.p2veloY !== 1 && !this.p2iskeydowntrue) {
      this.p2veloY = 9;
      this.p2iskeydowntrue = true;
    }
    if (e.keyCode === 87 && this.p1veloY !== -1 && !this.p1iskeydowntrue) {
      this.p1veloY = -9;
      this.p1iskeydowntrue = true;
    }
    if (e.keyCode === 83 && this.p1veloY !== 1 && !this.p1iskeydowntrue) {
      this.p1veloY = 9;
      this.p1iskeydowntrue = true;
    }
  }
  onP1KeyUp(e) {
    if (e.keyCode === 87 || e.keyCode === 83) {
      this.p1iskeydowntrue = false;
    }
  }
  onP2KeyUp(e) {
    if (e.keyCode === 38 || e.keyCode === 40) {
      this.p2iskeydowntrue = false;
    }
  }
}

const game = new Pingpong();
window.onload = () => {
  game.gameInit();
};