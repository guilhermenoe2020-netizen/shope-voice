import { Router } from "express";
import { listVoices, previewVoice } from "../controllers/voicesController.js";

const router = Router();

router.get("/", listVoices);
router.get("/:voiceId/preview", previewVoice);

export default router;
