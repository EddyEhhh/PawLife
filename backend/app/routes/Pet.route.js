import express from 'express';
import { getDemo } from "../controllers/App.controller.js";
import {getProfile} from "../controllers/User.controller.js";
import {getPets, postPets} from "../controllers/Pet.controller.js";

const router = express.Router();

router.get('/', getPets);
router.post('/', postPets);
export default router;

