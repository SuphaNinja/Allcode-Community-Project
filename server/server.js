import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import userRoutes from "./src/routes/userRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";

const app = express();
const httpServer = createServer(app);

// CORS configuration
app.use(cors({
    origin: ['https://www.allcodecommunity.com', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token'],
    credentials: true
}));
app.use(express.json());

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.get('/api', (req, res) => {
    res.json({ message: "API is running" });
});

// Root route
app.get('/', (req, res) => {
    res.json({ message: "Server is running" });
});

// Handle 404 - Keep this as the last route
app.use((req, res, next) => {
    res.status(404).send("Sorry, that route doesn't exist.");
});

// WebSocket setup
const io = new Server(httpServer, {
    cors: {
        origin: ['https://www.allcodecommunity.com', 'http://localhost:3000'],
        methods: ["GET", "POST"],
        credentials: true
    }
});

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });

    // Add your socket event handlers here
});

const PORT = process.env.PORT || 8080;

httpServer.listen(PORT, () => {
    console.log(`Server and WebSocket are running on port ${PORT}`);
});

export default app;