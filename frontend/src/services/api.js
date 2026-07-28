const API_BASE = "/api";

async function parseErrorMessage(response) {
  try {
    const data = await response.json();
    return data.error || "Erro inesperado. Tente novamente.";
  } catch {
    return "Erro inesperado. Tente novamente.";
  }
}

/** Lista as vozes de narração disponíveis. */
export async function fetchVoices() {
  const res = await fetch(`${API_BASE}/voices`);
  if (!res.ok) throw new Error(await parseErrorMessage(res));
  const data = await res.json();
  return data.voices;
}

/** Retorna a URL de prévia de áudio de uma voz (usada direto num <audio>). */
export function getVoicePreviewUrl(voiceId) {
  return `${API_BASE}/voices/${voiceId}/preview`;
}

/**
 * Envia o vídeo + textos de narração (início/meio/fim) e recebe o MP4
 * final como Blob, pronto para download.
 */
export async function generateNarration({ videoFile, voiceId, inicio, meio, fim }) {
  const formData = new FormData();
  formData.append("video", videoFile);
  formData.append("voiceId", voiceId);
  if (inicio) formData.append("inicio", inicio);
  if (meio) formData.append("meio", meio);
  if (fim) formData.append("fim", fim);

  const res = await fetch(`${API_BASE}/narration/generate`, { method: "POST", body: formData });
  if (!res.ok) throw new Error(await parseErrorMessage(res));
  return res.blob();
}

/** Gera hashtags a partir do nome do produto. */
export async function generateHashtags({ productName }) {
  const res = await fetch(`${API_BASE}/hashtags/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productName }),
  });
  if (!res.ok) throw new Error(await parseErrorMessage(res));
  return res.json();
}

/** Busca as 10 sugestões de legenda focadas em conversão. */
export async function fetchCaptionSuggestions(productName) {
  const params = productName ? `?productName=${encodeURIComponent(productName)}` : "";
  const res = await fetch(`${API_BASE}/captions/suggestions${params}`);
  if (!res.ok) throw new Error(await parseErrorMessage(res));
  const data = await res.json();
  return data.suggestions;
}

/** Queima a legenda escolhida no vídeo e retorna o MP4 final como Blob. */
export async function generateCaptionVideo({ videoFile, captionText }) {
  const formData = new FormData();
  formData.append("video", videoFile);
  formData.append("captionText", captionText);

  const res = await fetch(`${API_BASE}/captions/generate`, { method: "POST", body: formData });
  if (!res.ok) throw new Error(await parseErrorMessage(res));
  return res.blob();
}

/** Dispara o download de um Blob no navegador com o nome de arquivo dado. */
export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
