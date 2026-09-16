# P5 -> Pusher

Send messages from one p5 sketch to another over [Pusher Channels](https://pusher.com).

```
Client/ (p5 sender)  --POST /message-->  Servers_Pusher (Node)  --trigger-->  Pusher "chat"  -->  Display/ (p5 receiver)
```

The browser can't trigger Pusher events itself — that needs the app secret,
which must never live in browser code. So the client POSTs to a tiny Node
server, which triggers the `new-message` event on the `chat` channel. The
display sketch subscribes to that channel with the public key only.

## Folders

| Folder     | Role                                                                    |
|------------|-------------------------------------------------------------------------|
| `Client/`  | p5 sketch without canvas: text field + **Send** button.                 |
| `Display/` | p5 sketch that shows the latest message on a black 448 × 256 canvas.    |

## Server

The relay server is **not part of this repo**. It lives in its own repository:
[ZHdK-Critical-Coding/Servers_Pusher](https://github.com/ZHdK-Critical-Coding/Servers_Pusher)
(locally `../Servers_Pusher`).

## How to Use

1. Create a free Channels app on https://pusher.com and copy its **App Keys**.
2. Start the server from the Servers_Pusher repo:
   ```bash
   git clone https://github.com/ZHdK-Critical-Coding/Servers_Pusher.git
   cd Servers_Pusher
   npm install
   cp .env.example .env   # paste your keys into .env
   npm start              # -> http://localhost:3000
   ```
3. Put your public key and cluster into `PUSHER_KEY` / `PUSHER_CLUSTER` in `Display/sketch.js`.
4. Open `Display/index.html` and `Client/index.html` with Live Server.
5. Type a message in the client and click **Send** — it appears on the display.

If the server runs on another machine, change `SERVER_URL` in `Client/sketch.js`.

## Libraries

- p5.js 1.9.4, Pusher JS 8.4 (CDN); `express`, `cors`, `dotenv`, `pusher` (npm)
