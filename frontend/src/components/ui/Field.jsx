import styles from "./Field.module.css";

export default function Field({ label, hint, as = "input", ...rest }) {
  const Component = as;
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <Component className={styles.control} {...rest} />
      {hint && <span className={styles.hint}>{hint}</span>}
    </label>
  );
}
