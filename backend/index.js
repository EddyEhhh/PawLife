import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PORT } from './app/configs/app.config.js'
import mongoose from "mongoose";
import demoRouter from "./app/routes/App.route.js"
import vetRouter from "./app/routes/Vet.route.js"

dotenv.config({ path: './app/configs/db.config.env' });

const app = express();
const port = PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/v1', demoRouter);
app.use('/api/v1/vets', vetRouter);

mongoose
    .connect(process.env.MONGODBURL)
    .then(() => {
        console.log("Connected to DB");
        app.listen(PORT,  () => {
            try {
                console.log(`Server is running on port: ${PORT}`);
            } catch (err) {
                console.error(err);
            }
        });
    }).catch((error) => {
        console.log(error);
    })