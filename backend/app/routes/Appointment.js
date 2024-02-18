import express from 'express';
import { getDemo } from "../controllers/App.controller.js";
import {getAppointmentsByVet, getEmergencyAppointmentsByVet} from "../controllers/Appointment.controller.js";

const router = express.Router();

router.get('/', getAppointmentsByVet);
router.get('/emergency', getEmergencyAppointmentsByVet)
export default router;