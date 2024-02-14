import express from 'express';
import { getDemo } from "../controllers/App.controller.js";
import {getProfile} from "../controllers/User.controller.js";

const router = express.Router();

router.get('/profile', getProfile);

export default router;

