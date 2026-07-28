import { Sun, Moon } from "lucide-react";

/**
 * Botão de alternância entre tema claro e escuro. Usa os estilos
 * utilitários `.theme-toggle` definidos em styles/global.css para
 * não depender de CSS Modules (compartilhado entre topbar e sidebar).
 */
export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={onToggle}
      className="theme-toggle"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Mudar para o tema claro" : "Mudar para o tema escuro"}
      title={isDark ? "Tema escuro ativo" : "Tema claro ativo"}
    >
      <Sun className="theme-toggle-icon theme-toggle-icon--sun" aria-hidden="true" />
      <Moon className="theme-toggle-icon theme-toggle-icon--moon" aria-hidden="true" />
      <span className="theme-toggle-thumb">
        {isDark ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
      </span>
    </button>
  );
}
