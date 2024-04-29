let popup;

function setup() {
  createCanvas(400, 400);
  popup = createDiv("This is a popup"); // create a div element for the popup
  popup.id("popup"); // set the ID of the div element to "popup"
  popup.position(width / 2 - popup.width / 2, height / 2 - popup.height / 2); // center the popup
  const closeButton = createButton("Close"); // create a button element for the close button
  closeButton.parent(popup); // set the parent of the button to the popup div element
  closeButton.mousePressed(() => popup.hide()); // hide the popup when the button is clicked
}

function draw() {
  background(220);
}
