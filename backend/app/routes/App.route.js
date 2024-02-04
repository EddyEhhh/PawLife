import express from 'express';
import { getDemo } from "../controllers/App.controller.js";

const router = express.Router();

router.get('/', getDemo);

export default router;

