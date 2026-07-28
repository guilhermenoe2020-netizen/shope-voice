import Logo from "./Logo.jsx";
import ThemeToggle from "./ui/ThemeToggle.jsx";
import { useTheme } from "../hooks/useTheme.js";
import { NAV_ITEMS } from "../navigation.js";
import styles from "./AppShell.module.css";

export default function AppShell({ route, navigate, children }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.shell}>
      {/* Sidebar — visível a partir de tablets largos/desktop */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHead}>
          <Logo size={30} />
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
        <nav className={styles.sidebarNav} aria-label="Navegação principal">
          {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
            const active = route === key;
            return (
              <button
                key={key}
                onClick={() => navigate(key)}
                className={`${styles.sidebarLink} ${active ? styles.sidebarLinkActive : ""}`}
                aria-current={active ? "page" : undefined}
              >
                <Icon aria-hidden="true" />
                {label}
              </button>
            );
          })}
        </nav>
      </aside>

      <div className={styles.mainColumn}>
        {/* Topbar — só aparece em telas pequenas, onde não há sidebar */}
        <header className={styles.topbar}>
          <Logo size={26} />
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </header>

        <main className={styles.content}>
          <div className={`container ${styles.contentInner}`}>{children}</div>
        </main>
      </div>

      {/* Bottom nav — navegação padrão mobile-first */}
      <nav className={styles.bottomNav} aria-label="Navegação principal">
        {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
          const active = route === key;
          return (
            <button
              key={key}
              onClick={() => navigate(key)}
              className={`${styles.navButton} ${active ? styles.navButtonActive : ""}`}
              aria-current={active ? "page" : undefined}
            >
              <span className={styles.iconWrap}>
                <Icon aria-hidden="true" />
              </span>
              {label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
