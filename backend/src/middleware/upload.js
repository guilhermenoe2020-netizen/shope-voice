import multer from "multer";
import path from "node:path";
import { v4 as uuid } from "uuid";
import { TMP_DIR } from "../utils/cleanup.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, TMP_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || ".mp4";
    cb(null, `${uuid()}${ext}`);
  },
});

function videoFileFilter(req, file, cb) {
  const allowed = [".mp4", ".mov", ".webm", ".mkv"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.includes(ext)) return cb(null, true);
  cb(new Error("Formato de vídeo não suportado. Use MP4, MOV, WEBM ou MKV."));
}

export const uploadVideo = multer({
  storage,
  fileFilter: videoFileFilter,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB
});
