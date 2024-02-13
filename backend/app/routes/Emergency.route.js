import express from 'express';
import { getDemo } from "../controllers/App.controller.js";
import { getEmergency } from "../controllers/Emergency.controller.js";

const router = express.Router();

router.get('/', getEmergency);

export default router;

