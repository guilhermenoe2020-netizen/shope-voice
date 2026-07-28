import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import ffprobeInstaller from "@ffprobe-installer/ffprobe";
import path from "node:path";
import { v4 as uuid } from "uuid";
import { TMP_DIR } from "../utils/cleanup.js";
import { AppError } from "../middleware/errorHandler.js";
import { generateCaptionImage } from "../utils/generateCaptionImage.js";
import { safeDelete } from "../utils/cleanup.js";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);
ffmpeg.setFfprobePath(ffprobeInstaller.path);

async function videoHasAudio(videoPath) {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(videoPath, (err, metadata) => {
      if (err) return reject(err);
      const hasAudio = metadata.streams.some((s) => s.codec_type === "audio");
      resolve(hasAudio);
    });
  });
}

/** Lê largura/altura do vídeo (stream de vídeo) via ffprobe. */
function getVideoDimensions(videoPath) {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(videoPath, (err, metadata) => {
      if (err) return reject(new AppError("Não foi possível ler o vídeo enviado.", 400));
      const videoStream = metadata.streams.find((s) => s.codec_type === "video");
      if (!videoStream) return reject(new AppError("Vídeo sem stream de imagem.", 400));
      resolve({ width: videoStream.width, height: videoStream.height });
    });
  });
}

export function getVideoDuration(videoPath) {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(videoPath, (err, metadata) => {
      if (err) return reject(new AppError("Não foi possível ler o vídeo enviado.", 400));
      resolve(metadata.format.duration || 0);
    });
  });
}

export async function mixNarrationsIntoVideo(videoPath, narrations) {
  if (narrations.length === 0) {
    throw new AppError("Informe ao menos um ponto de narração.", 400);
  }

  const outputPath = path.join(TMP_DIR, `${uuid()}.mp4`);
  const hasAudio = await videoHasAudio(videoPath);

  return new Promise((resolve, reject) => {
    const command = ffmpeg(videoPath);
    narrations.forEach((n) => command.input(n.audioPath));

    const delayedLabels = narrations.map((n, i) => {
      const delayMs = Math.round(n.atSeconds * 1000);
      const label = `narr${i}`;
      return { filter: `[${i + 1}:a]adelay=${delayMs}|${delayMs}[${label}]`, label };
    });

    const filters = delayedLabels.map((d) => d.filter);

    let mixInputs;
    if (hasAudio) {
      mixInputs = ["[0:a]", ...delayedLabels.map((d) => `[${d.label}]`)].join("");
    } else {
      mixInputs = delayedLabels.map((d) => `[${d.label}]`).join("");
    }

    filters.push(
      `${mixInputs}amix=inputs=${hasAudio ? narrations.length + 1 : narrations.length}:duration=longest:dropout_transition=0[aout]`
    );

    command
      .complexFilter(filters.join(";"))
      .outputOptions(["-map 0:v", "-map [aout]", "-c:v copy", "-c:a aac"])
      .on("error", (err) => reject(new AppError(`Falha ao gerar narração: ${err.message}`, 500)))
      .on("end", () => resolve(outputPath))
      .save(outputPath);
  });
}

/**
 * Queima a legenda estilizada (fundo amarelo, cantos arredondados,
 * texto preto, Montserrat), posicionada na parte SUPERIOR do vídeo.
 *
 * Estratégia: gera um PNG com a caixa de legenda via `canvas`
 * (permite bordas arredondadas, algo que o drawtext do ffmpeg não suporta)
 * e sobrepõe esse PNG no vídeo com o filtro `overlay`.
 */
export async function burnCaption(videoPath, captionText, montserratFontPath) {
  const outputPath = path.join(TMP_DIR, `${uuid()}.mp4`);
  const tempImagePath = path.join(TMP_DIR, `caption_${uuid()}.png`);

  const { width } = await getVideoDimensions(videoPath);

  const fontSize = Math.round(width * 0.045);
  const topMargin = Math.round(width * 0.08);

  generateCaptionImage({
    text: captionText.trim(),
    videoWidth: width,
    fontPath: montserratFontPath,
    outputPath: tempImagePath,
    fontSize,
    radius: 24,
    bgColor: "#FFD400",
    textColor: "#000000",
  });

  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .input(tempImagePath)
      .complexFilter([`[0:v][1:v]overlay=(W-w)/2:${topMargin}`])
      .outputOptions(["-c:a copy"])
      .on("error", (err) => {
        safeDelete(tempImagePath);
        reject(new AppError(`Falha ao gerar legenda: ${err.message}`, 500));
      })
      .on("end", () => {
        safeDelete(tempImagePath);
        resolve(outputPath);
      })
      .save(outputPath);
  });
}