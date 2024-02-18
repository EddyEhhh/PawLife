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
import {createEmergencyAppointment, getEmergencyAppointment} from "./app/helpers/EmergencyAppointment.helper.js";
import emergencyRouter from "./app/routes/Emergency.route.js"
import userRouter from "./app/routes/User.route.js"
import petRouter from "./app/routes/Pet.route.js"
import appointmentRouter from "./app/routes/Appointment.js"
import axios from "axios";

dotenv.config({ path: './config/db.config.env' });

const app = express();
// const port = PORT || 5000;


app.use(cors());
app.use(express.json());

app.use('/api/v1', demoRouter);
app.use('/api/v1/vets', vetRouter);
app.use('/api/v1/emergency', emergencyRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/pets', petRouter);
app.use('/api/v1/appointments', appointmentRouter)

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
async function testFunction(pet_id, vet_id, appointment_time, appointment_duration){
    try {

        await createEmergencyAppointment(pet_id, vet_id, appointment_time, appointment_duration)

    } catch (err) {
        throw new Error("error.appointment.unavailable")
    }
    // console.log("Test Result: ", result.explain()
    //     .then(explanation => {
    //         console.log("Verbose query explanation:", explanation);
    //     })
    //     .catch(error => {
    //         console.error("Error retrieving query explanation:", error);
    //     }));
}

testRouter.post('/', async (req, res) =>{
    try {
        const { pet_id, vet_id } = req.query;
        const { appointment_time, appointment_duration } = req.body
        const result = await createEmergencyAppointment(pet_id, vet_id, appointment_time, appointment_duration);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
});

app.use('/api/v1/test', testRouter)