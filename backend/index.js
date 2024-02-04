import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PORT } from './app/configs/app.config.js'
import mongoose from "mongoose";
import demoRouter from "./app/routes/App.route.js"

dotenv.config({ path: './config/db.config.env' });

const app = express();
const port = PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/demo', demoRouter);

mongoose
    .connect(process.env.MONGODBURL)
    .then(() => {
        console.log("Connected to DB");
        app.listen(port,  () => {
            try {
                console.log(`Server is running on port: ${port}`);
            } catch (err) {
                console.error(err);
            }
        });
    }).catch((error) => {
        console.log(error);
    })