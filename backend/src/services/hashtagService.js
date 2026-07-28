import { CATEGORY_KEYWORDS, KEYWORD_TO_CATEGORY, BLOCKLIST } from "../data/hashtagDictionary.js";
import { AppError } from "../middleware/errorHandler.js";

const STOPWORDS = new Set([
  "de", "da", "do", "das", "dos", "e", "com", "para", "pra", "o", "a", "os", "as",
  "um", "uma", "no", "na", "em", "por",
]);

function normalize(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .toLowerCase();
}

function tokenize(text) {
  return normalize(text)
    .replace(/[_\-.]/g, " ")
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 2 && !STOPWORDS.has(word));
}

function toHashtag(word) {
  return word.replace(/[^a-z0-9]/g, "");
}

/**
 * Gera hashtags de SEO a partir do nome do produto.
 */
export async function generateHashtags({ productName } = {}) {
  const sourceText = (productName || "").trim();

  if (!sourceText) {
    throw new AppError("Informe o nome do produto para gerar as hashtags.", 400);
  }

  const tokens = tokenize(sourceText);
  if (tokens.length === 0) {
    throw new AppError("Não foi possível identificar palavras-chave no produto informado.", 400);
  }

  const matchedCategories = new Set();
  for (const token of tokens) {
    const category = KEYWORD_TO_CATEGORY[token];
    if (category) matchedCategories.add(category);
  }

  const hashtags = [];

  // 1) Nome completo do produto, concatenado (alta relevância de SEO direto)
  const fullName = toHashtag(tokens.join(""));
  if (fullName) hashtags.push(fullName);

  // 2) Cada palavra-chave relevante do nome do produto
  for (const token of tokens) {
    hashtags.push(toHashtag(token));
  }

  // 3) Combinações de duas palavras (ex.: "fone" + "bluetooth")
  for (let i = 0; i < tokens.length - 1; i++) {
    hashtags.push(toHashtag(tokens[i] + tokens[i + 1]));
  }

  // 4) Termos de categoria/característica/finalidade
  for (const category of matchedCategories) {
    hashtags.push(...CATEGORY_KEYWORDS[category]);
  }

  // Normaliza, remove vazios, remove bloqueadas e duplicadas
  const seen = new Set();
  const finalHashtags = [];
  for (const tag of hashtags) {
    const clean = tag.trim();
    if (!clean || clean.length < 3) continue;
    if (BLOCKLIST.has(clean)) continue;
    if (seen.has(clean)) continue;
    seen.add(clean);
    finalHashtags.push(`#${clean}`);
  }

  return {
    hashtags: finalHashtags.slice(0, 20),
    categoriasDetectadas: [...matchedCategories],
  };
}
