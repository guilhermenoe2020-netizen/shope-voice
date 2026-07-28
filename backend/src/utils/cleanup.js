import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Toda a pasta de trabalho fica fora de src/, isolada e fácil de apagar.
export const TMP_DIR = path.resolve(__dirname, "../../tmp");

const MAX_FILE_AGE_MS = 30 * 60 * 1000; // 30 minutos de segurança

export function ensureTmpDir() {
  if (!fs.existsSync(TMP_DIR)) {
    fs.mkdirSync(TMP_DIR, { recursive: true });
  }
}

/**
 * Remove um arquivo (ou lista de arquivos) imediatamente após o envio
 * ao cliente. Falha silenciosa e registrada em log, nunca derruba a API.
 */
export function safeDelete(...filePaths) {
  for (const filePath of filePaths) {
    if (!filePath) continue;
    fs.unlink(filePath, (err) => {
      if (err && err.code !== "ENOENT") {
        console.warn(`[cleanup] Não foi possível remover ${filePath}:`, err.message);
      }
    });
  }
}

/**
 * Rede de segurança: caso algum arquivo escape da limpeza pontual
 * (ex: cliente fechou a aba no meio do download), um job periódico
 * apaga qualquer resíduo mais velho que MAX_FILE_AGE_MS.
 */
export function startCleanupJob() {
  setInterval(() => {
    fs.readdir(TMP_DIR, (err, files) => {
      if (err) return;
      const now = Date.now();
      for (const file of files) {
        const filePath = path.join(TMP_DIR, file);
        fs.stat(filePath, (statErr, stats) => {
          if (statErr) return;
          if (now - stats.mtimeMs > MAX_FILE_AGE_MS) {
            safeDelete(filePath);
          }
        });
      }
    });
  }, 5 * 60 * 1000); // verifica a cada 5 minutos
}
