import path from "node:path";
import { synthesizeSpeech, getVoiceById } from "../services/ttsService.js";
import { getVideoDuration, mixNarrationsIntoVideo } from "../services/ffmpegService.js";
import { safeDelete } from "../utils/cleanup.js";
import { AppError } from "../middleware/errorHandler.js";

/**
 * Calcula em que segundo cada narração deve começar, garantindo que
 * ela caiba dentro da duração do vídeo.
 */
function computeTimestamp(point, videoDuration, narrationDuration) {
  const safetyMargin = 0.3;
  switch (point) {
    case "inicio":
      return 0;
    case "meio":
      return Math.max(0, videoDuration / 2 - narrationDuration / 2);
    case "fim":
      return Math.max(0, videoDuration - narrationDuration - safetyMargin);
    default:
      return 0;
  }
}

export async function generateNarration(req, res, next) {
  const generatedAudioPaths = [];
  const videoPath = req.file?.path;

  try {
    if (!videoPath) {
      throw new AppError("Envie o vídeo original.", 400);
    }

    const { voiceId, inicio, meio, fim } = req.body;
    getVoiceById(voiceId); // valida a voz antes de gastar processamento

    const points = { inicio, meio, fim };
    const activePoints = Object.entries(points).filter(([, text]) => text && text.trim());

    if (activePoints.length === 0) {
      throw new AppError("Preencha ao menos um campo de narração (início, meio ou fim).", 400);
    }

    const videoDuration = await getVideoDuration(videoPath);

    const narrations = [];
    for (const [point, text] of activePoints) {
      const audioPath = await synthesizeSpeech(text, voiceId);
      generatedAudioPaths.push(audioPath);

      const narrationDuration = await getVideoDuration(audioPath);
      const atSeconds = computeTimestamp(point, videoDuration, narrationDuration);
      narrations.push({ audioPath, atSeconds });
    }

    const outputPath = await mixNarrationsIntoVideo(videoPath, narrations);

    res.download(outputPath, "shope-voice-narracao.mp4", (err) => {
      safeDelete(videoPath, ...generatedAudioPaths, outputPath);
      if (err) console.warn("[narration] erro ao enviar arquivo:", err.message);
    });
  } catch (err) {
    safeDelete(videoPath, ...generatedAudioPaths);
    next(err);
  }
}
