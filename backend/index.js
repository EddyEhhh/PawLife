import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PORT } from './app/configs/app.config.js'
import mongoose from "mongoose";
import demoRouter from "./app/routes/App.route.js"
import vetRouter from "./app/routes/Vet.route.js"
import {Appointment} from "./app/models/Appointment.model.js";
import {getDemo} from "./app/controllers/App.controller.js";
import {getEpochInSecondsNow} from "./app/utils/Time.util.js";
import {getEmergencyAppointment} from "./app/helpers/EmergencyAppointment.helper.js";
import emergencyRouter from "./app/routes/Emergency.route.js"

dotenv.config({ path: './config/db.config.env' });

const app = express();
// const port = PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/v1', demoRouter);
app.use('/api/v1/vets', vetRouter);
app.use('/api/v1/emergency', emergencyRouter);

// console.log("DB:", process.env.MONGODBURL)

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



// TESTING CODE

const testRouter = express.Router();
async function testFunction(){
    try {
        // return Appointment.find(
        //     {
        //         vet_id: '65c3e28a0a12842cbe8e88c1',
        //         end_at: {$gt: getEpochInSecondsNow()}
        //     })
        //     .sort({start_at: 1})
        //     .limit(50);
        console.log("Test")
        const result = await getEmergencyAppointment("Hello").then((result) => {
            console.log("Result:", result);
        })

    } catch (err) {
        console.error(err);
    }
    // console.log("Test Result: ", result.explain()
    //     .then(explanation => {
    //         console.log("Verbose query explanation:", explanation);
    //     })
    //     .catch(error => {
    //         console.error("Error retrieving query explanation:", error);
    //     }));
}

testRouter.get('/', async (req, res) =>{
    try {
        const result = await testFunction();
        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Error"});
    }
});

app.use('/api/v1/test', testRouter)