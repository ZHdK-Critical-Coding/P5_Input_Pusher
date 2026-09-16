// A p5 sketch with no canvas: just a text field and a submit button.
// On submit it sends the text to our server, which forwards it to Pusher.

const SERVER_URL = "http://localhost:3000/message";

let input;
let button;

function setup() {
  noCanvas(); // we only want DOM elements, no drawing surface

  input = createInput("");
  input.attribute("placeholder", "Type a message");

  button = createButton("Send");
  button.mousePressed(sendMessage);
}

function sendMessage() {
  const message = input.value().trim();
  if (!message) return;

  fetch(SERVER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: message }),
  });

  input.value(""); // clear the field for the next message
}
