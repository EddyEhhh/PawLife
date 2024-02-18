import express from 'express';
import { getDemo } from "../controllers/App.controller.js";
import {getEmergency, postEmergency} from "../controllers/Emergency.controller.js";

const router = express.Router();

router.get('/', getEmergency);
router.post('/', postEmergency);

export default router;

