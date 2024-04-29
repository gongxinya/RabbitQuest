let textData = [];
let currentText = "";
let serialText = "";

function setup() {
    createCanvas(400, 400);
    background('grey');
    let input = createInput('');
    input.position(30, 30);
    input.size(300);
    input.id('text-field');
    input.attribute('disabled', 'true');
    let button = createButton('post');
    button.position(350, 30);
    button.id('submit-button');
    button.attribute('disabled', 'true');

    port = createSerial();

    // in setup, we can open ports we have used previously
    // without user interaction

    let usedPorts = usedSerialPorts();
    if (usedPorts.length > 0) {
        port.open(usedPorts[0], 115200);
    }

    // any other ports can be opened via a dialog after
    // user interaction (see connectBtnClick below)

    connectBtn = createButton('Connect to Arduino');
    connectBtn.position(80, 60);
    connectBtn.mousePressed(connectBtnClick);

    let sendBtn = createButton('Send hello');
    sendBtn.position(220, 60);
    sendBtn.mousePressed(sendBtnClick);
}

function draw() {
    background(0);
    fill(255);
    textSize(10);
    let lineNumber = 0;
    textData.forEach((el, i) => {
        el.split('/n').forEach((el1, i) => {
            text(el1, 20, 100 + lineNumber * 30);
            lineNumber++;
        });
        lineNumber++;
    });
    // reads in complete lines and prints them at the
    // bottom of the canvas
    let str = port.readUntil("\n");
    if (str.length > 0) {
        serialText = str;
    }

    text(`serial: ${serialText}`, 10, height - 20);

    // changes button label based on connection status
    if (!port.opened()) {
        connectBtn.html('Connect to Micro:bit');
    } else {
        connectBtn.html('Disconnect');
    }
}

function connectBtnClick() {
    if (!port.opened()) {
        port.open('MicroPython', 115200);
    } else {
        port.close();
    }
}

function sendBtnClick() {
    port.write("Hello from p5.js\n");
}