import { useCallback, useState } from "react";

/**
 * Encapsula o trio loading/error/success de qualquer ação assíncrona,
 * evitando repetir esse boilerplate em cada página.
 */
export function useAsyncTask() {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState(null);

  const run = useCallback(async (task) => {
    setStatus("loading");
    setError(null);
    try {
      const result = await task();
      setStatus("success");
      return result;
    } catch (err) {
      setStatus("error");
      setError(err.message || "Algo deu errado.");
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setError(null);
  }, []);

  return { status, error, isLoading: status === "loading", run, reset };
}
