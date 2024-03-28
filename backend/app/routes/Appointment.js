import express from 'express';
import { getDemo } from "../controllers/App.controller.js";
import {
    getAppointmentsByVet,
    getEmergencyAppointments} from "../controllers/Appointment.controller.js";

const router = express.Router();

router.get('/emergency', getEmergencyAppointments);
router.get('/:vet_id', getAppointmentsByVet);

export default router;