import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import fs from "node:fs";
import path from "node:path";
import { v4 as uuid } from "uuid";
import { TMP_DIR } from "../utils/cleanup.js";
import { AppError } from "../middleware/errorHandler.js";

/**
 * Catálogo de vozes disponíveis. Mantido aqui (e não espalhado pelo código)
 * para que trocar/adicionar vozes seja uma mudança em um único lugar.
 * Vozes neurais do Microsoft Edge: gratuitas, sem chave de API, e são
 * as mesmas usadas por diversos apps populares de edição para criadores.
 */
export const VOICES = [
  {
    id: "pt-br-feminina",
    name: "Francisca",
    gender: "Feminina",
    locale: "pt-BR",
    edgeVoice: "pt-BR-FranciscaNeural",
    description: "Voz natural, tom confiante — ideal para reviews de produto.",
  },
  {
    id: "pt-br-masculina",
    name: "Antônio",
    gender: "Masculina",
    locale: "pt-BR",
    edgeVoice: "pt-BR-AntonioNeural",
    description: "Voz clara e envolvente — ótima para narrações dinâmicas.",
  },
];

export function getVoiceById(voiceId) {
  const voice = VOICES.find((v) => v.id === voiceId);
  if (!voice) {
    throw new AppError(`Voz "${voiceId}" não encontrada.`, 404);
  }
  return voice;
}

/**
 * Sintetiza um trecho de texto em áudio (MP3) usando a voz escolhida.
 * Retorna o caminho do arquivo de áudio gerado em TMP_DIR.
 */
export async function synthesizeSpeech(text, voiceId) {
  if (!text || !text.trim()) {
    throw new AppError("Texto de narração vazio.", 400);
  }

  const voice = getVoiceById(voiceId);
  const outputPath = path.join(TMP_DIR, `${uuid()}.mp3`);

  const tts = new MsEdgeTTS();
  await tts.setMetadata(voice.edgeVoice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

  const { audioStream } = tts.toStream(text);

  await new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(outputPath);
    audioStream.pipe(writeStream);
    audioStream.on("error", reject);
    writeStream.on("finish", resolve);
    writeStream.on("error", reject);
  });

  return outputPath;
}
