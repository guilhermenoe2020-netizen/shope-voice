import { useRef, useState } from "react";
import { Play, Pause, Check } from "lucide-react";
import { getVoicePreviewUrl } from "../../services/api.js";
import styles from "./VoiceCard.module.css";

export default function VoiceCard({ voice, selected, onSelect }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [loadingPreview, setLoadingPreview] = useState(false);

  const togglePreview = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      return;
    }
    setLoadingPreview(true);
    audio.play().catch(() => setLoadingPreview(false));
  };

  return (
    <div
      className={`${styles.card} ${selected ? styles.selected : ""}`}
      onClick={() => onSelect(voice.id)}
      role="radio"
      aria-checked={selected}
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" ? onSelect(voice.id) : null)}
    >
      <div className={styles.info}>
        <div className={styles.nameRow}>
          <span className={styles.name}>{voice.name}</span>
          <span className={styles.badge}>{voice.gender}</span>
        </div>
        <p className={styles.description}>{voice.description}</p>
      </div>

      <button
        type="button"
        className={styles.playBtn}
        onClick={togglePreview}
        aria-label={playing ? `Pausar prévia de ${voice.name}` : `Ouvir prévia de ${voice.name}`}
      >
        {playing ? <Pause size={16} /> : <Play size={16} />}
      </button>

      {selected && (
        <span className={styles.checkMark} aria-hidden="true">
          <Check size={13} />
        </span>
      )}

      <audio
        ref={audioRef}
        src={getVoicePreviewUrl(voice.id)}
        preload="none"
        onPlay={() => {
          setPlaying(true);
          setLoadingPreview(false);
        }}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onError={() => {
          setPlaying(false);
          setLoadingPreview(false);
        }}
      />
    </div>
  );
}
