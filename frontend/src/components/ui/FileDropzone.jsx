import { useRef, useState, useCallback } from "react";
import { UploadCloud, FileVideo, X } from "lucide-react";
import styles from "./FileDropzone.module.css";

function formatSize(bytes) {
  if (!bytes) return "";
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

export default function FileDropzone({ file, onFileSelected, accept = "video/*", label }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = useCallback(
    (fileList) => {
      const selected = fileList?.[0];
      if (selected) onFileSelected(selected);
    },
    [onFileSelected]
  );

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  if (file) {
    return (
      <div className={styles.fileChip}>
        <FileVideo size={20} aria-hidden="true" />
        <div className={styles.fileInfo}>
          <span className={styles.fileName}>{file.name}</span>
          <span className={styles.fileMeta}>{formatSize(file.size)}</span>
        </div>
        <button
          type="button"
          className={styles.removeBtn}
          onClick={() => onFileSelected(null)}
          aria-label="Remover vídeo selecionado"
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <div
      className={`${styles.dropzone} ${dragging ? styles.dragging : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
      }}
      aria-label={label || "Enviar vídeo"}
    >
      <UploadCloud size={28} aria-hidden="true" />
      <p className={styles.title}>{label || "Toque para enviar o vídeo"}</p>
      <p className={styles.subtitle}>ou arraste o arquivo até aqui — MP4, MOV, WEBM</p>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="visually-hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
