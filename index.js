import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";

const dbConnection = process.env.DB_CONNECTION;
const port = process.env.PORT;

import userRoute from "./routes/userRoute.js";
import blogRoute from "./routes/blogPosrRoute.js"
import commentsRoute from "./routes/commentRoute.js"

// console.log(`Port ${port} + dbConnection ${dbConnection}`);

const app = express();

app.use(cors());

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1/blog', {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

app.get('/', (req, res) => {
    res.json({ "hello world": "world" });
});

app.use('/api/user', userRoute);
app.use('/api/blog', blogRoute);
app.use('/api/comments', commentsRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});