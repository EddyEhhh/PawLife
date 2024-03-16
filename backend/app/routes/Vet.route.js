import express from 'express';
import { getDemo } from "../controllers/App.controller.js";
import {getVets , getVetsById} from "../controllers/Vet.controller.js";

const router = express.Router();

router.get('/', getVets);
router.get('/vet', getVetsById);

export default router;

