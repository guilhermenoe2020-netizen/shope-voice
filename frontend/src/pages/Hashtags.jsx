import { useState } from "react";
import { Hash, Copy, Check } from "lucide-react";
import PageHeader from "../components/ui/PageHeader.jsx";
import Card from "../components/ui/Card.jsx";
import Field from "../components/ui/Field.jsx";
import Button from "../components/ui/Button.jsx";
import Notice from "../components/ui/Notice.jsx";
import { generateHashtags } from "../services/api.js";
import { useAsyncTask } from "../hooks/useAsyncTask.js";
import styles from "./Hashtags.module.css";

export default function Hashtags() {
  const [productName, setProductName] = useState("");
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const task = useAsyncTask();

  const canGenerate = productName.trim() && !task.isLoading;

  const handleGenerate = async () => {
    setResult(null);
    const data = await task.run(() => generateHashtags({ productName }));
    if (data) setResult(data);
  };

  const handleCopyAll = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.hashtags.join(" ")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div>
      <PageHeader
        eyebrow="Ferramenta 2 de 3"
        title="Gerar Hashtags"
        description="Hashtags de SEO focadas só no seu produto — nada de #fyp, #viral ou #shopee."
      />

      <div className={styles.stack}>
        <Card>
          <h2 className={styles.sectionTitle}>Nome do produto</h2>
          <Field
            label="Produto"
            placeholder="Ex: Fone de ouvido bluetooth à prova d'água"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </Card>

        {task.error && <Notice type="error">{task.error}</Notice>}

        <Button onClick={handleGenerate} disabled={!canGenerate} loading={task.isLoading} fullWidth>
          {task.isLoading ? (
            "Gerando hashtags..."
          ) : (
            <>
              <Hash size={17} /> Gerar hashtags
            </>
          )}
        </Button>

        {result && (
          <Card>
            <div className={styles.resultHeader}>
              <h2 className={styles.sectionTitle}>Resultado</h2>
              <button className={styles.copyBtn} onClick={handleCopyAll} type="button">
                {copied ? <Check size={15} /> : <Copy size={15} />}
                {copied ? "Copiado" : "Copiar tudo"}
              </button>
            </div>
            <div className={styles.chipList}>
              {result.hashtags.map((tag) => (
                <span key={tag} className={styles.chip}>
                  {tag}
                </span>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
