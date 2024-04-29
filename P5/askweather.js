let myText = "Hey kiddos! A cute and cuddly bunny in Fife needs your help! This precious little bunny is just a newborn and has lost his way. He's feeling scared and doesn't know which way to hop. Will you lend a hand and guide him to safety? Let's join forces and help this little Cutie find his way home!";
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
    startButton = createButton("Ask the weather");
    startButton.id('getWeather-button');
}

function draw() {
    background(backgroundImage);
    fill(0, 0, 0, 30);
    rect(0, 0, width, height);
    textSize(38);
    fill(255);
    textFont(bodyFont); // set the font
    let textWidth = width - 100; // calculate the maximum width for the text
    let x = 50; // x-coordinate of the text box
    let y = 50; // y-coordinate of the text box
    let textBoxHeight = height - y; // height of the text box
    text(myText.substring(0, currentIndex), x, y, textWidth, textBoxHeight); // display the text up to the current index
    if (currentIndex < myText.length) {
        if (frameCount % playbackSpeed == 0) { // play one character every playbackSpeed frames
            currentIndex++;
        }
    } else {
        displayButton = true; // show the button when the playback is finished
    }

    if (displayButton) {
        // display the button here
        // Create a "Start" button and set its position
        startButton.class('leaf-button'); // Add class for forest button styling
        startButton.position(width / 2 - 125, height - 280);
    }
}

function mouseClicked() {
    // Stop the text playback and display all text and buttons
    currentIndex = myText.length;
    displayButton = true;
}