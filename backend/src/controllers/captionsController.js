import path from "node:path";
import { fileURLToPath } from "node:url";
import { generateCaptionSuggestions } from "../services/captionSuggestionsService.js";
import { burnCaption } from "../services/ffmpegService.js";
import { safeDelete } from "../utils/cleanup.js";
import { AppError } from "../middleware/errorHandler.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MONTSERRAT_PATH = path.resolve(__dirname, "../assets/fonts/Montserrat-Bold.ttf");

export function getSuggestions(req, res) {
  const { productName } = req.query;
  const suggestions = generateCaptionSuggestions(productName);
  res.json({ suggestions });
}

export async function generateCaption(req, res, next) {
  const videoPath = req.file?.path;
  try {
    if (!videoPath) throw new AppError("Envie o vídeo original.", 400);

    const { captionText } = req.body;
    if (!captionText || !captionText.trim()) {
      throw new AppError("Escolha uma sugestão ou escreva uma legenda personalizada.", 400);
    }

    const outputPath = await burnCaption(videoPath, captionText.trim(), MONTSERRAT_PATH);

    res.download(outputPath, "shope-voice-legenda.mp4", (err) => {
      safeDelete(videoPath, outputPath);
      if (err) console.warn("[captions] erro ao enviar arquivo:", err.message);
    });
  } catch (err) {
    safeDelete(videoPath);
    next(err);
  }
}
