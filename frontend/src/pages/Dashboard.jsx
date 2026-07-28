import { Mic, Hash, Captions, ArrowRight, Video, Sparkles } from "lucide-react";
import PageHeader from "../components/ui/PageHeader.jsx";
import Card from "../components/ui/Card.jsx";
import styles from "./Dashboard.module.css";

const TOOLS = [
  {
    key: "narracao",
    icon: Mic,
    title: "Gerar Narração",
    description: "Envie o vídeo e adicione narração com voz de IA no início, meio e/ou fim.",
  },
  {
    key: "hashtags",
    icon: Hash,
    title: "Gerar Hashtags",
    description: "Hashtags de SEO focadas no produto — sem termos genéricos.",
  },
  {
    key: "legendas",
    icon: Captions,
    title: "Legendas",
    description: "Legenda estilo amarelo/preto, com 10 sugestões prontas para conversão.",
  },
];

const STEPS = [
  { icon: Video, text: "Envie o vídeo do produto (ele nunca é alterado além do que você pedir)." },
  { icon: Sparkles, text: "Escolha narração, hashtags ou legenda — pode usar as três, em qualquer ordem." },
  { icon: ArrowRight, text: "Baixe o resultado em MP4 e publique direto na sua rede." },
];

export default function Dashboard({ navigate }) {
  return (
    <div>
      <PageHeader
        eyebrow="Shope Voice"
        title="Gere vídeos com narração em minutos"
        description="Uma ferramenta pessoal para agilizar seu fluxo de conteúdo — sem editor complicado, sem login, sem enrolação."
      />

      <div className={styles.toolGrid}>
        {TOOLS.map(({ key, icon: Icon, title, description }) => (
          <Card
            key={key}
            className={styles.toolCard}
            onClick={() => navigate(key)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" ? navigate(key) : null)}
          >
            <span className={styles.toolIcon}>
              <Icon size={20} aria-hidden="true" />
            </span>
            <div className={styles.toolText}>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
            <ArrowRight size={18} className={styles.toolArrow} aria-hidden="true" />
          </Card>
        ))}
      </div>

      <Card className={styles.stepsCard}>
        <h2 className={styles.stepsTitle}>Como funciona</h2>
        <ol className={styles.stepsList}>
          {STEPS.map(({ icon: Icon, text }, i) => (
            <li key={i}>
              <span className={styles.stepNumber}>{i + 1}</span>
              <span>{text}</span>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}
