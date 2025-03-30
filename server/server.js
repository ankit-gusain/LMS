import express from 'express';
import cors from 'cors';
import "dotenv/config";

import connectDB from './configs/mongodb.js';
import { clerkWebhook } from './controllers/webhooks.js';

//initalize express app
const app = express();

//middleware
app.use(cors());

//connect to mongodb database
await connectDB();

//Routes
app.get("/", (req, res) => { res.send("Welcome to the server") });
app.post("/clerk", express.json(), clerkWebhook);


//port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
})
