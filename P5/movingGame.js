// Global variables
let rabbit, house, grass;
let rabbitX, rabbitY;
let houseWidth = 300;
let househeight = 280;
let houseX = 450;
let houseY = 200;
let isVictory, isFailure;
let rabbitImg;
let popupButton;
let popupWindow;
let outdoorTem;
let indoorTem;
let outdoorHum;
let indoorHum;
let yPos = 10; // the initial y position of the first text element
// let triggerAction = false;


function preload() {
  rabbitImg = loadImage('../pngs/bunny.png');
  houseImg = loadImage('../pngs/house1.png');
  headFont = loadFont('../fonts/head.ttf');
  bodyFont = loadFont('../fonts/body.ttf');
}

function setup() {
  createCanvas(800, 400);

  // Initial positions
  rabbitX = 100;
  rabbitY = 200;

  // Set initial game state
  isVictory = false;
  isFailure = false;

  let bakBotton = createButton('Back');
  bakBotton.position(10, 30);
  bakBotton.id('submit-button');
  bakBotton.mousePressed(getBack);

}

function getBack() {
  window.history.back();
}


function resetGameState() {
  isVictory = false;
  isFailure = false;
  rabbitX = 100;
  rabbitY = 200;
}


function draw() {
  background(200, 255, 255);

  // Draw the house
  drawHouse();

  // Draw the rabbit nest
  drawRabbitNest();

  // Draw the grass
  drawGrass();

  // Draw the rabbit
  drawRabbit();

  // Check for victory or failure
  if (!isVictory && !isFailure) {
    checkGameState();
  } else {
    displayMessage();
  }

  outdoorTem = localStorage.getItem(`textData${1}`);
  indoorTem = localStorage.getItem(`textData${2}`);
  outdoorHum = localStorage.getItem(`textData${11}`);
  indoorHum = localStorage.getItem(`textData${12}`);

  // display temperature in the upper right corner of the screen
  fill(0);
  textSize(18);
  textAlign(RIGHT, TOP);
  text(`Live data from the museum:`, width - 10, yPos);
  textSize(15);
  text(`Indoor Temperature: ${indoorTem} °C`, width - 10, yPos + 20);
  text(`Indoor Humidity: ${indoorHum} °C`, width - 10, yPos + 40);
  text(`Outdoor Temperature: ${outdoorTem} °C`, width - 10, yPos + 70);
  text(`Outdoor Humidity: ${outdoorHum} °C`, width - 10, yPos + 90);

  textSize(20);
  textAlign(LEFT, TOP);
  text(`Which one is more suitable for bunny life ?`, 60, yPos + 20);
  text(`Try to mve the rabbit inside or outside the house`, 60, yPos + 40);
  text(`You could find hidden clues about bunnies on our website!`, 60, yPos + 60);
}

function drawHouse() {

  imageMode(CENTER);
  image(houseImg, houseX, houseY, houseWidth, househeight);
}

function drawRabbitNest() {
  fill(153, 102, 51);
  ellipse(100, 250, 100, 30);
}

function drawGrass() {
  fill(50, 200, 50);
  rect(0, 350, width, 50);
}

function drawRabbit() {
  let rabbitWidth = 100;
  let rabbitHeight = 140;
  imageMode(CENTER);
  image(rabbitImg, rabbitX, rabbitY, rabbitWidth, rabbitHeight);
}

function checkGameState() {
  if (rabbitX >= houseX - houseWidth / 2 && rabbitX <= houseX + houseWidth / 2 && rabbitY >= houseY - househeight / 2 && rabbitY <= houseY + househeight / 2) {
    isVictory = true;
    document.dispatchEvent(new Event('isVictoryChanged')); // dispatch an event to notify the HTML file
  } else if (rabbitY >= 300) {
    isFailure = true;
  }
}

function displayMessage() {
  textSize(32);
  textAlign(CENTER);
  if (isVictory) {
    fill(0, 255, 0);
    text("Congratulations! the rabbit went to the right place!", width / 2, height / 2);
  } else {
    fill(255, 0, 0);
    text("Ah! the rabbit went to the wrong place!", width / 2, height / 2);
  }
}


function mousePressed() {
  if (isFailure) {
    resetGameState();
  } else if (isVictory) {
    resetGameState();
    window.location.href = 'index.html';
  } else if (dist(mouseX, mouseY, rabbitX, rabbitY) < 40) {
    rabbitX = mouseX;
    rabbitY = mouseY;
  }
}

function mouseDragged() {
  if (dist(mouseX, mouseY, rabbitX, rabbitY) < 40) {
    rabbitX = mouseX;
    rabbitY = mouseY;
  }
}
