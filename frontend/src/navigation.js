import { LayoutDashboard, Mic, Hash, Captions } from "lucide-react";

/**
 * Fonte única de verdade para o menu — usada tanto pela sidebar (desktop)
 * quanto pela barra inferior (mobile), garantindo que os dois nunca
 * fiquem dessincronizados.
 */
export const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "narracao", label: "Narração", icon: Mic },
  { key: "hashtags", label: "Hashtags", icon: Hash },
  { key: "legendas", label: "Legendas", icon: Captions },
];
