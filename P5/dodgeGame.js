let port;
let connectBtn;
let temperature;
let myText = "Hey kiddos! A cute and cuddly bunny in Fife needs your help! This precious little bunny is just a newborn and has lost his way. He's feeling scared and doesn't know which way to hop. Will you lend a hand and guide him to safety? Let's join forces and help this little Cutie find his way home!";
let currentIndex = 0;
let playbackSpeed = 5; // in milliseconds
let displayButton = false;
let displayTime = 0;
// let displayButton = true;
let width = 800;
let height = 600;

let drops = [];
let sunRadius = 50;
let rayLength = 100;
let angle = 0;

let ifWinter = true;
let temp = 10; // temperature shown in the bar
let tempValue = 10; // temperature from micro:bit


let text1 = "Change the Microbit's temperature to alter the bunny's living environment.";
let text2 = "Press button A to switch between environments";
let text3 = "Press button B to release predators and emit a distress signal";
let text4 = "It's not warm enough, I need even more warmth... ..."

function preload() {
    snowBackgroundImage = loadImage('../pngs/snowBackground.png');
    sunBackgroundImage = loadImage('../pngs/lifeBackground1.jpg');
    headFont = loadFont('../fonts/head.ttf');
    bodyFont = loadFont('../fonts/body.ttf');
}

function setup() {
    createCanvas(width, height);
    noStroke();

    port = createSerial();
    // in setup, we can open ports we have used previously
    // without user interaction

    let usedPorts = usedSerialPorts();
    if (usedPorts.length > 0) {
        port.open(usedPorts[0], 115200);
    }

    connectBtn = createButton('Start Game (Connect to Micro:bit)');
    connectBtn.position(20, height - 40);
    connectBtn.mousePressed(connectBtnClick);

    let bakBotton = createButton('Back');
    bakBotton.position(10, 30);
    bakBotton.mousePressed(getBack);

}

function draw() {
    if (ifWinter) {
        background(snowBackgroundImage);
        fill(0, 0, 0, 60);
        rect(0, 0, width, height);
        // Generate new drops
        if (random(1) < 0.1) {
            drops.push(new Drop());
        }
        // Update and display drops
        for (let i = drops.length - 1; i >= 0; i--) {
            drops[i].update();
            drops[i].display();
            if (drops[i].offscreen()) {
                drops.splice(i, 1);
            }
        }

        textSize(34);
        textFont(bodyFont);
        text(text4, 70, 320, width - 80, height - 60);
    } else {
        background(sunBackgroundImage);
        fill(0, 0, 0, 60);
        rect(0, 0, width, height);
        // draw the sun
        fill('yellow');
        noStroke();
        push(); // push the current drawing transformation matrix
        translate(width - sunRadius - 20, sunRadius + 20); // set the center of the sun
        arc(0, 0, sunRadius * 2, sunRadius * 2, PI, TWO_PI);
        pop(); // pop the previous drawing transformation matrix

        // draw the rays of sunshine
        stroke('yellow');
        strokeWeight(5);
        for (let i = 0; i < 8; i++) {
            push();
            translate(width - sunRadius - 20, sunRadius + 20);
            rotate(angle + TWO_PI / 8 * i);
            line(0, 0, rayLength, 0);
            pop();
        }

        // update the angle for animation
        angle += 0.02;

        noStroke();

    }

    textSize(24);
    fill(255);
    textFont(headFont); // set the font
    let textWidth = width - 80; // calculate the maximum width for the text
    let x = 70; // x-coordinate of the text box
    let y = 60; // y-coordinate of the text box
    let textBoxHeight = height - y; // height of the text box
    text(text1, x, y, textWidth, textBoxHeight); // display the text up to the current index
    text(text2, x, y + 100, textWidth, textBoxHeight);
    text(text3, x, y + 140, textWidth, textBoxHeight);

    // reads in complete lines and prints them at the
    // bottom of the canvas
    let str = port.readUntil("\n");
    if (str.length > 0) {
        text(str, 10, height - 20);
        console.log(str);
        if (!str.includes("b")) {
            tempValue = parseInt(str);
            if (tempValue >= 24) {
                console.log("warm")
                ifWinter = false;
                console.log("ifWinter is false")
            } else { //When the microbit temperature is less than 24 degrees, it is judged as winter
                // Display some text for 5 seconds
                if (frameCount < 300) { // 60 frames per second * 5 seconds = 300 frames
                    textSize(24);
                    fill(255);
                    textFont(headFont);
                    text(text4, x, y + 200, textWidth, textBoxHeight);
                } else {
                    // Pause for 2 seconds before restarting the animation
                    setTimeout(function () {
                        frameCount = 0;
                    }, 2000);
                }
                ifWinter = true;
                console.log("ifWinter is true now")
            }
        } else {
            console.log("It's b")
            if (ifWinter) {
                window.location.href = 'snowEagle.html';
                console.log("It's winter now, hurry up and hide next to the easier-to-survive rabbits")
            } else {
                window.location.href = 'sunEagle.html';
                console.log("It's spring now, hurry up and hide next to the easier-to-survive rabbits")
            }
        }
    }


    // changes button label based on connection status
    if (!port.opened()) {
        connectBtn.html('Start Game (Connect to Micro:bit)');
    } else {
        connectBtn.html('Disconnect');
    }

    // update temperature
    temp = tempValue + random(-0.2, 0.2); // simulate incoming temperature data
    // map temperature to scale bar range
    let tempWidth = map(temp, 10, 24, 0, width * 0.8);
    // draw scale bar
    noStroke();
    fill(63, 92, 102);
    rect(width * 0.11, height * 0.7, width * 0.8, 30); // draw scale bar
    fill(126, 192, 217);
    rect(width * 0.11, height * 0.7, tempWidth, 30); // draw temperature bar
    // draw temperature text
    textFont(bodyFont); // reset font to default
    fill(0);
    textSize(20);
    //   text(`Temperature: ${tempValue.toFixed(1)} °C`, 10, height - 30);
    text(`Temperature: ${tempValue}   C`, 100, height - 120);
}



function mouseClicked() {
    // Stop the text playback and display all text and buttons
    currentIndex = myText.length;
    displayButton = true;
}

function connectBtnClick() {
    if (!port.opened()) {
        port.open('MicroPython', 115200);
    } else {
        port.close();
    }
}

class Drop {
    constructor() {
        this.x = random(width);
        this.y = -10;
        this.speed = random(1, 5);
        this.size = random(5, 20);
        this.alpha = map(this.size, 5, 20, 100, 255);
    }

    update() {
        this.y += this.speed;
        this.alpha = map(this.y, -10, height, 100, 255);
    }

    display() {
        fill(255, 255, 255, this.alpha);

        ellipse(this.x, this.y, this.size, this.size);
    }

    offscreen() {
        return this.y > height + 10;
    }
}

function getBack() {
    window.history.back();
}