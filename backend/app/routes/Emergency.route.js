import express from 'express';
import { getDemo } from "../controllers/App.controller.js";
import {getEmergency, postEmergency , getUpcomingEmergency} from "../controllers/Emergency.controller.js";

const router = express.Router();

router.get('/', getEmergency);
router.get('/upcoming', getUpcomingEmergency); // Get upcoming appointments in HomePage
router.post('/', postEmergency);

export default router;

