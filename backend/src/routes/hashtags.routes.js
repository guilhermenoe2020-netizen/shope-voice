import { Router } from "express";
import { generateHashtagsController } from "../controllers/hashtagsController.js";

const router = Router();

router.post("/generate", generateHashtagsController);

export default router;
