# P5.js: Pusher

[English](readme.md)

Schickt Nachrichten von einem p5-Sketch zu einem anderen über
[Pusher Channels](https://pusher.com). `Client/` hat ein Textfeld und einen
**Send**-Knopf, `Display/` zeigt die letzte Nachricht auf einer schwarzen
Zeichenfläche. Ein Ausgangspunkt, um einen Sketch vom Handy oder von einem
anderen Computer aus fernzusteuern.

```
Client/ (p5-Sender)  --POST /message-->  Servers_Pusher (Node)  --trigger-->  Pusher "chat"  -->  Display/ (p5-Empfänger)
```

## Installation

Voraussetzungen: eine kostenlose Channels-App auf https://pusher.com und der
Relay-Server
[Servers_Pusher](https://github.com/ZHdK-Critical-Coding/Servers_Pusher)
(lokal `../Servers_Pusher`, nicht Teil dieses Repos). Der Browser kann
selbst keine Pusher-Events auslösen – dafür braucht es das App-Secret, das
nie im Browser-Code stehen darf –, deshalb schickt der Client per POST an
den Server.

1. Die Channels-App erstellen und die **App Keys** kopieren.
2. Den Server einrichten:
   ```bash
   git clone https://github.com/ZHdK-Critical-Coding/Servers_Pusher.git
   cd Servers_Pusher
   npm install
   cp .env.example .env   # Keys in .env eintragen
   ```
3. Den öffentlichen Key und den Cluster in `PUSHER_KEY` / `PUSHER_CLUSTER`
   in `Display/sketch.js` eintragen.

Läuft der Server auf einem anderen Rechner, `SERVER_URL` in
`Client/sketch.js` anpassen.

Bibliotheken (CDN): p5.js 1.9.4, Pusher JS 8.4.0 (nur Display).

## Ausführen

1. Den Server starten (im Ordner `Servers_Pusher`):
   ```bash
   npm start              # -> http://localhost:3000
   ```
2. Den Ordner in Visual Studio Code öffnen und `Display/index.html` und
   `Client/index.html` mit Live Server öffnen (Rechtsklick → **Open with
   Live Server**).
3. Im Client eine Nachricht eingeben und auf **Send** klicken – sie
   erscheint auf dem Display.

## Coding-Hilfe

- **`Client/sketch.js` → `setup()`**: keine Zeichenfläche (`noCanvas()`),
  nur ein Eingabefeld und ein **Send**-Knopf.
- **`Client/sketch.js` → `sendMessage()`**: schickt `{ message }` als JSON
  per POST an `SERVER_URL` und leert das Feld. Leere Nachrichten werden
  ignoriert.
- **`Display/sketch.js` → `setup()`**: erstellt die 448 × 256 grosse
  Zeichenfläche, verbindet sich mit `new Pusher(PUSHER_KEY, { cluster })`,
  abonniert `chat` und bindet `new-message`, das `data.message` in
  `latestMessage` speichert. Kanal und Event müssen zum Server passen.
- **`Display/sketch.js` → `draw()`**: schwarzer Hintergrund, zeichnet
  `latestMessage` umbrochen über die ganze Fläche. Grösse, Schrift oder
  Layout hier ändern.
