import { Router } from "express";
import { predictCarrer } from "../controllers/gemini.controller.js";

const router = Router();

router.post("/get-career-predicted",predictCarrer);

export default router;