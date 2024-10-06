import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.json({ message: "Hello World" });
});

// Handle 404 - Keep this as the last route
app.use((req, res, next) => {
    res.status(404).send("Sorry, that route doesn't exist.");
});

export default app;

// For local developmen