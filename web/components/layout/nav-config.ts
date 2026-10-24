import {
  BookOpen,
  Cloud,
  FileText,
  Info,
  KeyRound,
  LayoutDashboard,
  Monitor,
  Settings,
  SquareTerminal,
  Upload,
  Users,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  title: string;
  icon: LucideIcon;
  /**
   * "new": page already served by this app (path under /app, handled by next/link).
   * "legacy": page still served by the Blazor portal. Path is absolute, from the
   * site root, and must be a plain <a>: next/link would prepend the /app base path.
   */
  kind: "new" | "legacy";
  href: string;
};

export type NavGroup = { label?: string; items: NavItem[] };

export const navigation: NavGroup[] = [
  {
    items: [
      { title: "Início", icon: LayoutDashboard, kind: "new", href: "/" },
      { title: "Dispositivos", icon: Monitor, kind: "legacy", href: "/" },
      { title: "Downloads", icon: Cloud, kind: "legacy", href: "/downloads" },
      { title: "Controle remoto", icon: SquareTerminal, kind: "legacy", href: "/Viewer" },
      { title: "Implantar", icon: Upload, kind: "legacy", href: "/deploy" },
      { title: "Scripts", icon: FileText, kind: "legacy", href: "/scripts" },
    ],
  },
  {
    label: "Administração",
    items: [
      { title: "Organização", icon: Users, kind: "legacy", href: "/manage-organization" },
      { title: "Chaves de API", icon: KeyRound, kind: "legacy", href: "/api-keys" },
      { title: "Logs do servidor", icon: BookOpen, kind: "legacy", href: "/server-logs" },
      { title: "Configuração do servidor", icon: Settings, kind: "legacy", href: "/server-config" },
    ],
  },
  {
    label: "Ajuda",
    items: [{ title: "Sobre", icon: Info, kind: "new", href: "/sobre" }],
  },
];
