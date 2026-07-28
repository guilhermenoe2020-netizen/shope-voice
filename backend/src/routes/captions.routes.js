import { Router } from "express";
import { uploadVideo } from "../middleware/upload.js";
import { getSuggestions, generateCaption } from "../controllers/captionsController.js";

const router = Router();

router.get("/suggestions", getSuggestions);
router.post("/generate", uploadVideo.single("video"), generateCaption);

export default router;
