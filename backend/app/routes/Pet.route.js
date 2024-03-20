import express from 'express';
import { getDemo } from "../controllers/App.controller.js";
import {getProfile} from "../controllers/User.controller.js";
import {deletePet, getPets, getPetsById, patchPetDetail, postPets} from "../controllers/Pet.controller.js";

const router = express.Router();

router.get('/', getPets);
router.get('/pet', getPetsById);
router.post('/', postPets);
router.delete('/pet', deletePet)
router.patch('/:pet_id', patchPetDetail)
export default router;

