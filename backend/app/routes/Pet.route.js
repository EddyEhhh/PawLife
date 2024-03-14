import express from 'express';
import { getDemo } from "../controllers/App.controller.js";
import {getProfile} from "../controllers/User.controller.js";
import {getPets, getPetsById, postPets} from "../controllers/Pet.controller.js";

const router = express.Router();

router.get('/', getPets);
router.get('/pet', getPetsById);
router.post('/', postPets);
export default router;

