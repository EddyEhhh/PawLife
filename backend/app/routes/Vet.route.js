import express from 'express';
import { getDemo } from "../controllers/App.controller.js";
import {getVets} from "../controllers/Vet.controller.js";

const router = express.Router();

router.get('/', getVets);

export default router;

