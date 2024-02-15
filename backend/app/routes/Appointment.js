import express from 'express';
import { getDemo } from "../controllers/App.controller.js";
import {getAppointmentsByVet} from "../controllers/Appointment.controller.js";

const router = express.Router();

router.get('/', getAppointmentsByVet);

export default router;