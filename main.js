let now = new Date();
let christmas = new Date('2020-12-25 00:00:00');

let nbMsBeforeChristmas = christmas.getTime() - now.getTime();
let nbDaysBeforeChristmas = nbMsBeforeChristmas / (1000 * 3600 * 24);

nbDaysBeforeChristmas = Math.ceil(nbDaysBeforeChristmas);

console.log(nbDaysBeforeChristmas);

let christmasModeWidget = document.createElement('div');
christmasModeWidget.innerText = `Noël est dans ${nbDaysBeforeChristmas} jours`;
christmasModeWidget.style = `
position: fixed;
bottom: 16px;
right: 16px;
z-index: 9999999999;
font-size:16px;
text-align:center;
background:white;
border-radius:4px;
font-weight:bold;
font-family: sans-serif;
box-shadow: 0px 0px 16px red;
padding:16px;
`;

document.body.appendChild(christmasModeWidget);

let enableChristmasModeBtn = document.createElement('button');
enableChristmasModeBtn.innerText = "Activer le mode Noël 🎅";
enableChristmasModeBtn.style = `
display:block;
border:none;
background-color:#388E3C;
border-radius:4px;
padding:8px 16px;
margin-top:8px;
color:white;
font-weight:bold;
cursor:pointer;
`;

christmasModeWidget.appendChild(enableChristmasModeBtn);

enableChristmasModeBtn.addEventListener("click", enableChristmasMode);

function enableChristmasMode() {
  console.log("Joyeux Noel");
  christmasModeWidget.remove();

  /*
  ** MUSIQUE DE NOël
  */

  let audioPlayer = document.createElement("audio");
  audioPlayer.loop = true;
  audioPlayer.src = "https://cf.appdrag.com/wassimdemo/audio/Christmas Village - Aaron Kenny.mp3";
  audioPlayer.type = 'audio/mpeg';
  audioPlayer.autoplay = true;
  audioPlayer.style = "display:none;";

  document.body.appendChild(audioPlayer);

  initSnow();
}


/*
** NEIGE !!!
*/


function initSnow() {
  let canvas = document.createElement('canvas');
  canvas.style = `
  position:fixed;
  top:0px;
  left:0px;
  width:100vw;
  height:100vh;
  z-index:42;
  pointer-events:none;
  `;

  document.body.appendChild(canvas);

  let ctx = canvas.getContext('2d');
  let windowW;
  let windowH;
  let numFlakes = 242;
  let flakes = [];

  
  function Flake(x, y) {
    let maxWeight = 4;
    let maxSpeed = 4;

    this.initialX = x;
    this.x = x;
    this.y = y;
    this.horizontalMovement = randomBetween(-1, 1);

    this.weight = randomBetween(2, maxWeight);
    this.alpha = (this.weight / maxWeight);
    this.speed = this.alpha * maxSpeed;

    this.update = function() {
      this.x += this.horizontalMovement;
      this.y += this.speed;
      if (this.y >= windowH) {
        this.y = -this.weight;
        this.x = this.initialX;
      }
    }
  }

  scaleCanvas();
  buildFlakes();
  loop();

  window.onresize = function () {
    scaleCanvas();
  }

  function scaleCanvas() {
    windowW = window.innerWidth;
    windowH = window.innerHeight;
    canvas.width = windowW;
    canvas.height = windowH;
  }

  function buildFlakes() {
    flakes = [];
    for (let i = 0; i < numFlakes; i++) {
      let x = randomBetween(0, windowW);
      let y = randomBetween(0, windowH);
      let flake = new Flake(x, y);
      flakes.push(flake);
    }
  }

  function loop() {
    // clear canvas
    ctx.clearRect(0, 0, windowW, windowH);

    // draw flakes
    for (let i = 0; i < flakes.length; i++) {
      let flake = flakes[i];
      flake.update();

      ctx.beginPath();
      ctx.arc(flake.x, flake.y, flake.weight, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'rgba(255, 255, 255, ' + flake.alpha + ')';
      ctx.fill();
    }

    requestAnimationFrame(loop);
  }
}

function randomBetween(min, max) {
  return Math.random() * (max - min + 1) + min;
}