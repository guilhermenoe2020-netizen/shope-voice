import { Loader2 } from "lucide-react";
import styles from "./Button.module.css";

/**
 * Botão único do sistema, com 3 variantes. Mantém tudo em um lugar
 * para que qualquer ajuste visual (cor, raio, estado de loading)
 * se propague para o app inteiro.
 */
export default function Button({
  children,
  variant = "primary",
  loading = false,
  disabled = false,
  type = "button",
  onClick,
  fullWidth = false,
  ...rest
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${styles.btn} ${styles[variant]} ${fullWidth ? styles.fullWidth : ""}`}
      {...rest}
    >
      {loading && <Loader2 className={styles.spinner} aria-hidden="true" />}
      {children}
    </button>
  );
}
