import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import styles from "./Notice.module.css";

const ICONS = {
  error: AlertCircle,
  success: CheckCircle2,
  info: Info,
};

export default function Notice({ type = "info", children }) {
  const Icon = ICONS[type];
  return (
    <div className={`${styles.notice} ${styles[type]}`} role={type === "error" ? "alert" : "status"}>
      <Icon size={18} aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}
