import express from 'express';
import Authrouter from './routes/auth.route.js';
import Chatrouter from './routes/message.route.js';
import connectDB from './lib/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { app, server } from './lib/socket.js';
import path from 'path';
const port = 5000;
const __dirname = path.resolve();
dotenv.config();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", Authrouter)
app.use("/api/chat", Chatrouter)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
    })
}

server.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`)
    connectDB()
});