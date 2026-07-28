import { VOICES, synthesizeSpeech } from "../services/ttsService.js";
import { safeDelete } from "../utils/cleanup.js";

export function listVoices(req, res) {
  // Nunca expõe o nome técnico da voz do provedor (edgeVoice), só o necessário no front
  const publicVoices = VOICES.map(({ id, name, gender, locale, description }) => ({
    id,
    name,
    gender,
    locale,
    description,
  }));
  res.json({ voices: publicVoices });
}

export async function previewVoice(req, res, next) {
  const { voiceId } = req.params;
  let audioPath;
  try {
    audioPath = await synthesizeSpeech(
      "Essa é uma prévia da minha voz para narrar seu vídeo de produto.",
      voiceId
    );
    res.sendFile(audioPath, (err) => {
      safeDelete(audioPath);
      if (err) console.warn("[voices] erro ao enviar prévia:", err.message);
    });
  } catch (err) {
    safeDelete(audioPath);
    next(err);
  }
}
