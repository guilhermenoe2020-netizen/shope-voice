import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";

import narrationRoutes from "./routes/narration.routes.js";
import hashtagsRoutes from "./routes/hashtags.routes.js";
import captionsRoutes from "./routes/captions.routes.js";
import voicesRoutes from "./routes/voices.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { ensureTmpDir, startCleanupJob } from "./utils/cleanup.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares globais
app.use(cors());
app.use(express.json({ limit: "2mb" }));

// Garante que a pasta temporária existe e agenda limpeza automática
// dos arquivos processados (nenhum arquivo fica salvo permanentemente).
ensureTmpDir();
startCleanupJob();

// Rotas de domínio (uma por funcionalidade do menu)
app.use("/api/narration", narrationRoutes);
app.use("/api/hashtags", hashtagsRoutes);
app.use("/api/captions", captionsRoutes);
app.use("/api/voices", voicesRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Shope Voice API" });
});

// Handler de erro central — mantém as rotas limpas, sem try/catch repetido
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Shope Voice API rodando em http://localhost:${PORT}`);
});
