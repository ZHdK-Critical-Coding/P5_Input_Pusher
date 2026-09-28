# P5.js: Pusher

[Deutsch](README_DE.md)

Sends messages from one p5 sketch to another over
[Pusher Channels](https://pusher.com). `Client/` has a text field and a
**Send** button, `Display/` shows the latest message on a black canvas. A
starting point for remote-controlling a sketch from a phone or another
computer.

```
Client/ (p5 sender)  --POST /message-->  Servers_Pusher (Node)  --trigger-->  Pusher "chat"  -->  Display/ (p5 receiver)
```

## Installation

Requirements: a free Channels app on https://pusher.com and the relay
server (see Server).

1. Create the Channels app and copy its **App Keys**.
2. Put your public key and cluster into `PUSHER_KEY` / `PUSHER_CLUSTER` in
   `Display/sketch.js`.

Libraries (CDN): p5.js 1.9.4, Pusher JS 8.4.0 (Display only).

## Server

Needs the Node server
[Servers_Pusher](https://github.com/ZHdK-Critical-Coding/Servers_Pusher)
(locally `../Servers_Pusher`, not part of this repo) on port 3000. The
browser can't trigger Pusher events itself — that needs the app secret,
which must never live in browser code — so the client POSTs to the server
instead. It can run on the same computer or on another machine in the
network. Set it up once; it must be running before you open the sketches
(How to Run, step 1):

```bash
git clone https://github.com/ZHdK-Critical-Coding/Servers_Pusher.git
cd Servers_Pusher
npm install
cp .env.example .env   # paste your keys into .env
```

If the server runs on another machine, change `SERVER_URL` in
`Client/sketch.js` (default `http://localhost:3000/message`).

## How to Run

1. Start the server (in the `Servers_Pusher` folder):
   ```bash
   npm start              # -> http://localhost:3000
   ```
2. Open the folder in Visual Studio Code and open `Display/index.html` and
   `Client/index.html` with Live Server (right-click → **Open with Live
   Server**).
3. Type a message in the client and click **Send** — it appears on the
   display.

## Coding Help

- **`Client/sketch.js` → `setup()`**: no canvas (`noCanvas()`), only an
  input field and a **Send** button.
- **`Client/sketch.js` → `sendMessage()`**: POSTs `{ message }` as JSON to
  `SERVER_URL` and clears the field. Empty messages are ignored.
- **`Display/sketch.js` → `setup()`**: creates the 448 × 256 canvas,
  connects with `new Pusher(PUSHER_KEY, { cluster })`, subscribes to
  `chat` and binds `new-message`, which stores `data.message` in
  `latestMessage`. Channel and event must match the server.
- **`Display/sketch.js` → `draw()`**: black background, draws
  `latestMessage` wrapped into the whole canvas. Change size, font or
  layout here.
