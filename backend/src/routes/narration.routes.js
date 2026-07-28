import { Router } from "express";
import { uploadVideo } from "../middleware/upload.js";
import { generateNarration } from "../controllers/narrationController.js";

const router = Router();

router.post("/generate", uploadVideo.single("video"), generateNarration);

export default router;
