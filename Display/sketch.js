// A p5 sketch that subscribes to a Pusher channel and shows the latest
// message on a 448x256 canvas. Black background, white text. Nothing else.
//
// Flow:  sender -> server -> Pusher channel "chat"  -> (this sketch listens)

// Public Pusher app key + cluster. These are safe to expose in the browser;
// only the app SECRET (kept in the server's .env) must never live here.
const PUSHER_KEY = "41fe75d4d695da422c60";
const PUSHER_CLUSTER = "eu";

// The most recent message we received. Shown on the canvas every frame.
let latestMessage = "waiting for a message…";

function setup() {
  createCanvas(448, 256);

  textAlign(CENTER, CENTER); // center the text in its box
  textSize(24);
  fill(255); // white text
  noStroke();

  // Connect to Pusher and listen for messages.
  const pusher = new Pusher(PUSHER_KEY, { cluster: PUSHER_CLUSTER });
  const channel = pusher.subscribe("chat"); // same channel the server uses
  channel.bind("new-message", (data) => {
    // The server sends { message: "..." }; keep just the text.
    latestMessage = data.message;
  });
}

function draw() {
  background(0); // black

  // Draw the message wrapped inside the whole canvas (x, y, width, height).
  text(latestMessage, 0, 0, width, height);
}
