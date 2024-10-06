import app from "./src/app.js";
import { initializeSocketServer } from "./src/socketServer.js";
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.json({ message: 'Hello from the server!' });
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

initializeSocketServer(server);