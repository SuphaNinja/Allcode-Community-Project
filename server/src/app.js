import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const corsOptions = {
    origin: 'https://www.allcodecommunity.com',
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
    res.json({ message: "API is running" });
});

app.get('/', (req, res) => {
    res.json({ message: "Server is running" });
});

export default app;