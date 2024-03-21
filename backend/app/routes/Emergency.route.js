import express from 'express';
import { getDemo } from "../controllers/App.controller.js";
import {deleteEmergency, getEmergency, postEmergency} from "../controllers/Emergency.controller.js";

const router = express.Router();

router.get('/', getEmergency);
router.post('/', postEmergency);
router.delete('/:emergency_id', deleteEmergency)

export default router;

