import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const isLocal = process.env.NODE_ENV === "LOCAL";

const corsOptions = {
    origin: isLocal ? 'http://localhost:5173' : 'https://www.allcodecommunity.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token'],
    credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.get('/api', (req, res) => {
    res.json({ message: "API is running", environment: isLocal ? "LOCAL" : "PRODUCTION" });
});

app.get('/', (req, res) => {
    res.json({ message: "Server is running", environment: isLocal ? "LOCAL" : "PRODUCTION" });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', environment: isLocal ? "LOCAL" : "PRODUCTION" });
});

app.listen(8080, () => {
    console.log(`app is running in LOCAL mode on port `);
});

export default app;