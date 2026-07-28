import { useEffect, useState } from "react";
import { Wand2 } from "lucide-react";
import PageHeader from "../components/ui/PageHeader.jsx";
import Card from "../components/ui/Card.jsx";
import FileDropzone from "../components/ui/FileDropzone.jsx";
import VoiceCard from "../components/ui/VoiceCard.jsx";
import Field from "../components/ui/Field.jsx";
import Button from "../components/ui/Button.jsx";
import Notice from "../components/ui/Notice.jsx";
import { fetchVoices, generateNarration, downloadBlob } from "../services/api.js";
import { useAsyncTask } from "../hooks/useAsyncTask.js";
import styles from "./Narration.module.css";

export default function Narration() {
  const [videoFile, setVideoFile] = useState(null);
  const [voices, setVoices] = useState([]);
  const [voiceId, setVoiceId] = useState(null);
  const [texts, setTexts] = useState({ inicio: "", meio: "", fim: "" });
  const [voicesError, setVoicesError] = useState(null);

  const generateTask = useAsyncTask();

  useEffect(() => {
    fetchVoices()
      .then((list) => {
        setVoices(list);
        if (list[0]) setVoiceId(list[0].id);
      })
      .catch((err) => setVoicesError(err.message));
  }, []);

  const hasAnyText = texts.inicio.trim() || texts.meio.trim() || texts.fim.trim();
  const canGenerate = videoFile && voiceId && hasAnyText && !generateTask.isLoading;

  const handleGenerate = async () => {
    const blob = await generateTask.run(() =>
      generateNarration({
        videoFile,
        voiceId,
        inicio: texts.inicio,
        meio: texts.meio,
        fim: texts.fim,
      })
    );
    if (blob) downloadBlob(blob, "shope-voice-narracao.mp4");
  };

  return (
    <div>
      <PageHeader
        eyebrow="Ferramenta 1 de 3"
        title="Gerar Narração"
        description="Envie o vídeo, escolha a voz e escreva o que ela deve dizer no início, no meio e/ou no fim. Campos vazios simplesmente não recebem narração."
      />

      <div className={styles.stack}>
        <Card>
          <h2 className={styles.sectionTitle}>1. Vídeo</h2>
          <FileDropzone file={videoFile} onFileSelected={setVideoFile} />
        </Card>

        <Card>
          <h2 className={styles.sectionTitle}>2. Voz</h2>
          {voicesError && <Notice type="error">{voicesError}</Notice>}
          <div className={styles.voiceList} role="radiogroup" aria-label="Escolha a voz">
            {voices.map((voice) => (
              <VoiceCard
                key={voice.id}
                voice={voice}
                selected={voiceId === voice.id}
                onSelect={setVoiceId}
              />
            ))}
          </div>
        </Card>

        <Card>
          <h2 className={styles.sectionTitle}>3. O que a voz vai dizer</h2>
          <div className={styles.fieldsGrid}>
            <Field
              as="textarea"
              rows={3}
              label="Início"
              hint="Narração logo nos primeiros segundos"
              placeholder="Ex: Você precisa conhecer esse produto..."
              value={texts.inicio}
              onChange={(e) => setTexts((t) => ({ ...t, inicio: e.target.value }))}
            />
            <Field
              as="textarea"
              rows={3}
              label="Meio"
              hint="Narração no meio do vídeo"
              placeholder="Ex: Repare como ele resolve..."
              value={texts.meio}
              onChange={(e) => setTexts((t) => ({ ...t, meio: e.target.value }))}
            />
            <Field
              as="textarea"
              rows={3}
              label="Fim"
              hint="Narração perto do final (chamada para ação)"
              placeholder="Ex: Link na bio para garantir o seu..."
              value={texts.fim}
              onChange={(e) => setTexts((t) => ({ ...t, fim: e.target.value }))}
            />
          </div>
        </Card>

        {generateTask.error && <Notice type="error">{generateTask.error}</Notice>}
        {generateTask.status === "success" && (
          <Notice type="success">Narração gerada! O download deve começar automaticamente.</Notice>
        )}

        <Button
          onClick={handleGenerate}
          disabled={!canGenerate}
          loading={generateTask.isLoading}
          fullWidth
        >
          {generateTask.isLoading ? (
            "Gerando narração..."
          ) : (
            <>
              <Wand2 size={17} /> Gerar e baixar MP4
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
