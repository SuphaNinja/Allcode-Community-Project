import app from "./src/app.js";
import { initializeSocketServer } from "./src/socketServer.js";

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// Websocket for livechat

const socketServer = initializeSocketServer(app);

const socketPort =  5050;
socketServer.listen(socketPort, () => {
    console.log(`Websocket is running on port ${socketPort}`);
});