import { useEffect, useState } from "react";
import { Captions as CaptionsIcon, Sparkles } from "lucide-react";
import PageHeader from "../components/ui/PageHeader.jsx";
import Card from "../components/ui/Card.jsx";
import FileDropzone from "../components/ui/FileDropzone.jsx";
import Field from "../components/ui/Field.jsx";
import Button from "../components/ui/Button.jsx";
import Notice from "../components/ui/Notice.jsx";
import { fetchCaptionSuggestions, generateCaptionVideo, downloadBlob } from "../services/api.js";
import { useAsyncTask } from "../hooks/useAsyncTask.js";
import styles from "./Captions.module.css";

export default function Captions() {
  const [videoFile, setVideoFile] = useState(null);
  const [productName, setProductName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [customText, setCustomText] = useState("");
  const [useCustom, setUseCustom] = useState(false);

  const suggestionsTask = useAsyncTask();
  const generateTask = useAsyncTask();

  const loadSuggestions = () =>
    suggestionsTask.run(async () => {
      const list = await fetchCaptionSuggestions(productName);
      setSuggestions(list);
      setSelectedId(list[0]?.id || null);
      setUseCustom(false);
      return list;
    });

  useEffect(() => {
    loadSuggestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finalCaptionText = useCustom
    ? customText
    : suggestions.find((s) => s.id === selectedId)?.text || "";

  const canGenerate = videoFile && finalCaptionText.trim() && !generateTask.isLoading;

  const handleGenerate = async () => {
    const blob = await generateTask.run(() =>
      generateCaptionVideo({ videoFile, captionText: finalCaptionText.trim() })
    );
    if (blob) downloadBlob(blob, "shope-voice-legenda.mp4");
  };

  return (
    <div>
      <PageHeader
        eyebrow="Ferramenta 3 de 3"
        title="Legendas"
        description="Estilo único, fundo amarelo com texto preto em Montserrat, posicionado automaticamente na melhor região do vídeo."
      />

      <div className={styles.stack}>
        <Card>
          <h2 className={styles.sectionTitle}>1. Vídeo</h2>
          <FileDropzone file={videoFile} onFileSelected={setVideoFile} />
        </Card>

        <Card>
          <h2 className={styles.sectionTitle}>2. Sugestões de legenda</h2>
          <div className={styles.suggestionsForm}>
            <Field
              label="Nome do produto (opcional, personaliza as sugestões)"
              placeholder="Ex: garrafa térmica inteligente"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && loadSuggestions()}
            />
            <Button variant="secondary" onClick={loadSuggestions} loading={suggestionsTask.isLoading}>
              <Sparkles size={16} /> Atualizar
            </Button>
          </div>

          <div className={styles.suggestionList} role="radiogroup" aria-label="Escolha uma legenda">
            {suggestions.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`${styles.suggestionItem} ${
                  !useCustom && selectedId === s.id ? styles.suggestionSelected : ""
                }`}
                onClick={() => {
                  setSelectedId(s.id);
                  setUseCustom(false);
                }}
                role="radio"
                aria-checked={!useCustom && selectedId === s.id}
              >
                <span className={styles.triggerTag}>{s.triggerLabel}</span>
                <span>{s.text}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className={styles.sectionTitle}>3. Ou escreva sua própria legenda</h2>
          <Field
            as="textarea"
            rows={2}
            label="Legenda personalizada"
            placeholder="Escreva sua própria chamada..."
            value={customText}
            onChange={(e) => {
              setCustomText(e.target.value);
              setUseCustom(true);
            }}
            onFocus={() => setUseCustom(true)}
          />
        </Card>

        {generateTask.error && <Notice type="error">{generateTask.error}</Notice>}
        {generateTask.status === "success" && (
          <Notice type="success">Legenda aplicada! O download deve começar automaticamente.</Notice>
        )}

        <Button onClick={handleGenerate} disabled={!canGenerate} loading={generateTask.isLoading} fullWidth>
          {generateTask.isLoading ? (
            "Aplicando legenda..."
          ) : (
            <>
              <CaptionsIcon size={17} /> Gerar e baixar MP4
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
