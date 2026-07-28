import { useEffect, useState, useCallback } from "react";

const DEFAULT_ROUTE = "dashboard";

function readHash() {
  const hash = window.location.hash.replace("#/", "").replace("#", "");
  return hash || DEFAULT_ROUTE;
}

/**
 * Roteador minimalista baseado em location.hash. Evita adicionar uma
 * dependência de roteamento só para 4 páginas fixas, mas ainda dá URL
 * navegável, botão voltar/avançar do navegador e deep-link funcionando.
 */
export function useHashRoute() {
  const [route, setRoute] = useState(readHash);

  useEffect(() => {
    const onHashChange = () => setRoute(readHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = useCallback((next) => {
    window.location.hash = `/${next}`;
  }, []);

  return { route, navigate };
}
