let myText = "Hey kiddo!  We are waiting for a response from our friend in the museum. In the meantime, let's go to the message page and send him more messages to help us find out the temperature and moderate around the bunny. Let's work together to help the bunny stay cozy and warm!";
let currentIndex = 0;
let playbackSpeed = 5; // in milliseconds
let displayButton = false;
// let displayButton = true;
let width = 800;
let height = 600;


function preload() {
    backgroundImage = loadImage('../pngs/lifeBackground2.jpg');
    headFont = loadFont('../fonts/head.ttf');
    bodyFont = loadFont('../fonts/body.ttf');
}

function setup() {
    createCanvas(width, height);
    leaveButton = createButton("Leave here");
    leaveButton.class('leaf-button'); // Add class for forest button styling
    leaveButton.position(width / 2 - 125, height - 250);
    leaveButton.mousePressed(leaveButtonPressed);
    const textData = JSON.parse(localStorage.getItem('textData'));
    console.log("I get the data:" + textData);

    angleMode(DEGREES); // set angle mode to degrees
}

function draw() {
    background(backgroundImage);
    // Add a semi-transparent black layer over the background image
    fill(0, 0, 0, 150);
    rect(0, 0, width, height);
    textSize(38);
    fill(255);
    textFont(bodyFont); // set the font
    let textWidth = width - 120; // calculate the maximum width for the text
    let x = 70; // x-coordinate of the text box
    let y = 60; // y-coordinate of the text box
    let textBoxHeight = height - y; // height of the text box
    text(myText, x, y, textWidth, textBoxHeight); // display the text up to the current index

    let angle = frameCount * 3; // increase angle over time
    push();
    translate(width / 2, height / 2 + 50); // move to center of canvas
    rotate(angle); // rotate by current angle
    rectMode(CENTER);
    fill(88, 102, 81);
    rect(0, 0, 50, 50); // draw rectangle
    pop();

    fill(0);
    textSize(32);
    textAlign(CENTER);
    text("Waiting...", width / 2, height / 2 + 120);


}

function leaveButtonPressed() {
    window.location.href = 'index.html';
}
