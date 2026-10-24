"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, UserRound } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { navigation } from "./nav-config";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  // usePathname() already excludes the /app base path.
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <span className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg font-semibold">
                  R
                </span>
                <span className="grid flex-1 text-left leading-tight">
                  <span className="truncate font-semibold">Remotamente</span>
                  <span className="text-muted-foreground truncate text-xs">Portal de suporte</span>
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {navigation.map((group, index) => (
          <SidebarGroup key={group.label ?? index}>
            {group.label ? <SidebarGroupLabel>{group.label}</SidebarGroupLabel> : null}
            <SidebarMenu>
              {group.items.map((item) => (
                <SidebarMenuItem key={`${item.kind}:${item.href}:${item.title}`}>
                  {item.kind === "new" ? (
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)}>
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  ) : (
                    <>
                      <SidebarMenuButton asChild tooltip={`${item.title} (portal atual)`}>
                        {/* Plain anchor on purpose: this page is still served by the Blazor portal. */}
                        <a href={item.href}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                      <SidebarMenuBadge>
                        <ExternalLink className="size-3" aria-label="Abre no portal atual" />
                      </SidebarMenuBadge>
                    </>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Conta (portal atual)">
              <a href="/Account/Manage">
                <UserRound />
                <span>Conta</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
