import express from 'express';
import { getDemo } from "../controllers/App.controller.js";
import {
    deleteAppointmentBookingRequestByVet,
    getAppointmentBookingRequestByUser,
    getAppointmentBookingRequestByVet,
    getAppointmentsByVet,
    getEmergencyAppointments, postAppointmentBookingRequest
} from "../controllers/Appointment.controller.js";

const router = express.Router();

router.get('/emergency', getEmergencyAppointments);
router.get('/booking/vet', getAppointmentBookingRequestByVet)
router.delete('/booking/:booking_id', deleteAppointmentBookingRequestByVet)
router.get('/booking', getAppointmentBookingRequestByUser)
router.get('/:vet_id', getAppointmentsByVet);
router.post('/:vet_id', postAppointmentBookingRequest)

export default router;