import app from "./src/app.js";
import { initializeSocketServer } from "./src/socketServer.js";
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Websocket for livechat
initializeSocketServer(server);