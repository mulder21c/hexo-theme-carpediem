import { createContext, useContext } from "react";
import type { HexoContextValue, HexoLog, HexoProviderProps } from "./HexoContext.d";

const HexoContext = createContext<HexoContextValue | null>(null);

const NOOP_HEXO_LOG: HexoLog = {
  info: () => {},
  warn: () => {},
  error: () => {},
  debug: () => {},
};

/**
 * Provider component that wraps the application and provides Hexo context.
 * This should be used in the renderer to wrap layout components.
 */
function HexoProvider({ value, children }: HexoProviderProps) {
  const hexoLog = value.site.hexoLog ?? NOOP_HEXO_LOG;
  return (
    <HexoContext.Provider value={{ ...value, hexoLog }}>{children}</HexoContext.Provider>
  );
}

/**
 * Hook to access Hexo context data.
 * Must be used within a HexoProvider.
 *
 * @throws Error if used outside of HexoProvider
 * @returns HexoContextValue containing site, page, config, theme, path, and url
 */
function useHexo(): HexoContextValue {
  const context = useContext(HexoContext);
  if (context === null) {
    throw new Error("useHexo must be used within a HexoProvider");
  }
  return context;
}

export { HexoContext, HexoProvider, useHexo };
