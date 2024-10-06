import app from "./src/app.js";
import { createServer } from "http";
import { initializeSocketServer } from "./src/socketServer.js";
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8080;

const httpServer = createServer(app);

initializeSocketServer(httpServer);

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;