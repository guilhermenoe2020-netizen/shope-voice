import ffmpeg from "fluent-ffmpeg";

export function getVideoDimensions(inputPath) {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(inputPath, (err, metadata) => {
      if (err) return reject(err);

      const videoStream = metadata.streams.find(
        (s) => s.codec_type === "video"
      );

      if (!videoStream) {
        return reject(new Error("Nenhum stream de vídeo encontrado"));
      }

      resolve({
        width: videoStream.width,
        height: videoStream.height,
      });
    });
  });
}
