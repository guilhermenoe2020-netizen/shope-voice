import ffmpeg from "fluent-ffmpeg";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { generateCaptionImage } from "./generateCaptionImage.js";
import { getVideoDimensions } from "./getVideoDimensions.js";
import { safeDelete, TMP_DIR, ensureTmpDir } from "./cleanup.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const MONTSERRAT_PATH = path.resolve(
  __dirname,
  "../assets/fonts/Montserrat-Bold.ttf"
);

export async function burnCaption({ inputPath, outputPath, captionText, topMargin = 60 }) {
  ensureTmpDir();

  const { width: videoWidth } = await getVideoDimensions(inputPath);

  const tempImagePath = path.join(TMP_DIR, `caption_${Date.now()}.png`);

  generateCaptionImage({
    text: captionText,
    videoWidth,
    fontPath: MONTSERRAT_PATH,
    outputPath: tempImagePath,
    fontSize: Math.round(videoWidth * 0.045),
    radius: 24,
  });

  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .input(tempImagePath)
      .complexFilter([`[0:v][1:v]overlay=(W-w)/2:${topMargin}`])
      .outputOptions(["-c:a copy"])
      .on("end", () => {
        safeDelete(tempImagePath);
        resolve(outputPath);
      })
      .on("error", (err) => {
        safeDelete(tempImagePath);
        reject(err);
      })
      .save(outputPath);
  });
}
