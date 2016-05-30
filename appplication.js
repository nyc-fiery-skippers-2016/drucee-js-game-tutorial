<script>
var redGamePiece;
var greenObstacles = [];

function startGame() {
  redGamePiece = new component(75, 75, "red", 10, 10);
  greenObstacle = new component(10, 200, "green", 300, 120);
  myUpBtn = new component(30, 30, "blue", 50, 10);
  myDownBtn = new component(30, 30, "blue", 50, 70);
  myLeftBtn = new component(30, 30, "blue", 20, 40);
  myRightBtn = new component(30, 30, "blue", 80, 40);
  myGameArea.start();
}

function component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function() {
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom  = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (this.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    if ((mybottom < othertop) ||
          (mytop > otherbottom) ||
          (myright < otherleft) ||
          (myleft > otherright) {
        crash = false;
          }
      return crash;
  }
}

var myGameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20)
    window.addEventListener('mousedown', function(e) {
      myGameArea.x = e.pageX;
      myGameArea.y = e.pageY;
    })
    window.addEventListener('mouseup'), function(e) {
      myGameArea.x = false;
      myGameArea.y = false;
    }
    window.addEventListener('keydown', function(e) {
      myGameArea.key = e.keyCode;
    })
    window.addEventListener('keyup', function(e) {
      myGameArea.key = false;
    })
  },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  stop: function() {
    clearInterval(this.interval);
  }
}

function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
  return false;
}

function updateGameArea() {
  var x, height, gap, minHeight, maxHeight, minGap, maxGap;
  for (i = 0; i < greenObstacles.length; i += 1) {
    if (redGamePiece.crashWith(greenObstacles[i])) {
      myGameArea.stop();
      return;
    }
  }
  myGameArea.clear();
  myGameArea.frameNo += 1;
  if (myGameArea.frameNo == 1 || everyinterval(150)) {
    x = myGameArea.canvas.width;
      minHeight = 20;
      maxHeight = 200;
      height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
      minGap = 50;
      maxGap = 200;
      gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
      greenObstacles.push(new component(10, height, "green", x, 0));
      greenObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
  }
  for (i = 0; i < greenObstacles.length; i += 1) {
    greenObstacles[i].x += -1;
    greenObstacles[i].update();
  }
  redGamePiece.newPos();
  redGamePiece.update();
}
</script>
