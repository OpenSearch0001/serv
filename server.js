const http = require("http");
const WebSocket = require("ws");

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on("connection", socket => {
    console.log("A user connected");

    socket.on("message", message => {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString()); // Convert the message to a string
            }
        });
    });

    socket.on("close", () => {
        console.log("A user disconnected");
    });
});

server.listen(3000, () => {
    console.log("WebSocket server is running on port 3000");
});
