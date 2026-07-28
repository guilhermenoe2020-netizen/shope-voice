/**
 * Marca do Shope Voice: um "balão de fala" que se funde a uma onda
 * sonora — representa a ideia central do produto (dar voz a vídeos
 * de produto). Vetor puro, sem dependências externas.
 */
export default function Logo({ withWordmark = true, size = 32 }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Shope Voice"
      >
        <defs>
          <linearGradient id="sv-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#6D28D9" />
            <stop offset="1" stopColor="#EC4899" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="12" fill="url(#sv-gradient)" />
        {/* Onda sonora estilizada, com barras assimétricas (fala natural) */}
        <g stroke="white" strokeWidth="2.6" strokeLinecap="round">
          <line x1="10" y1="20" x2="10" y2="20" />
          <line x1="14" y1="14" x2="14" y2="26" />
          <line x1="19" y1="9" x2="19" y2="31" />
          <line x1="24" y1="15" x2="24" y2="25" />
          <line x1="29" y1="17" x2="29" y2="23" />
        </g>
      </svg>
      {withWordmark && (
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: size * 0.56,
            color: "var(--ink)",
            letterSpacing: "-0.01em",
          }}
        >
          Shope<span style={{ color: "var(--voice-violet)" }}>Voice</span>
        </span>
      )}
    </div>
  );
}
