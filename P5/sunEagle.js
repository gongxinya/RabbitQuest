let eagleImage;
let eagles = [];
let numEagles = 3;

let bulbX = 700;
let bulbY = 50;
let bulbSize = 50;
let hue;
let saturation;
let brightness;

let text1 = "Waiting for rescue...";

function preload() {
  eagleImage = loadImage('../pngs/eagle.png');
  backgroundImage = loadImage('../pngs/lifeBackground1.jpg');
  headFont = loadFont('../fonts/head.ttf');
}

function setup() {
  createCanvas(800, 600);
  leaveButton = createButton("Leave here");
  leaveButton.class('leaf-button'); // Add class for forest button styling
  leaveButton.position(width / 2 - 125, height - 280);
  leaveButton.mousePressed(leaveButtonPressed);

  let bakBotton = createButton('Back');
  bakBotton.position(10, 30);
  bakBotton.mousePressed(getBack);

  for (let i = 0; i < numEagles; i++) {
    let eagle = createEagle();
    eagles.push(eagle);
  }
}

function createEagle() {
  let eagleX = random(width);
  let eagleY = random(height);
  let eagleSpeed = random(1, 3);
  let eagleSize = random(50, 150);
  return {
    x: eagleX,
    y: eagleY,
    speed: eagleSpeed,
    size: eagleSize
  };
}

function draw() {
  background(backgroundImage);

  fill(0, 0, 0, 20);
  rect(0, 0, width, height);

  textSize(50);
  fill(255);
  textFont(headFont); // set the font
  let textWidth = width - 80; // calculate the maximum width for the text
  let x = 70; // x-coordinate of the text box
  let y = 60; // y-coordinate of the text box
  let textBoxHeight = height - y; // height of the text box
  text(text1, width / 2 - 200, height / 2, textWidth, textBoxHeight); // display the text up to the current index



  for (let i = 0; i < eagles.length; i++) {
    let eagle = eagles[i];

    // move the eagle
    eagle.x += random(-eagle.speed, eagle.speed);
    eagle.y += random(-eagle.speed, eagle.speed);

    // constrain the eagle to the canvas
    eagle.x = constrain(eagle.x, eagle.size / 2, width - eagle.size / 2);
    eagle.y = constrain(eagle.y, eagle.size / 2, height - eagle.size / 2);

    // display the eagle
    image(eagleImage, eagle.x - eagle.size / 2, eagle.y - eagle.size / 2, eagle.size, eagle.size);



  }
  hue = JSON.parse(localStorage.getItem(`textData${21}`));
  saturation = JSON.parse(localStorage.getItem(`textData${22}`));
  brightness = JSON.parse(localStorage.getItem(`textData${23}`));

  const newHue = 360 - parseInt(hue[0])
  const newSaturation = 100 - parseInt(saturation[0])
  const newBrightness = 100 - parseInt(brightness[0])

  fill(newHue, newSaturation, newBrightness);
  ellipse(bulbX, bulbY, bulbSize);
}

function leaveButtonPressed() {
  window.location.href = 'index.html';
}

function getBack() {
  window.history.back();
}