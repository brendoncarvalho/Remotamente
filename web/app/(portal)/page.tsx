import Link from "next/link";
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { navigation } from "@/components/layout/nav-config";

export default function HomePage() {
  const items = navigation.flatMap((group) => group.items);
  const migrated = items.filter((item) => item.kind === "new");
  const legacy = items.filter((item) => item.kind === "legacy");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Início</h1>
        <p className="text-muted-foreground mt-1 max-w-2xl">
          O portal está sendo migrado por etapas. As telas abaixo já usam o novo visual; as demais continuam
          funcionando no portal atual, no mesmo endereço.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Telas migradas <Badge variant="secondary">{migrated.length}</Badge>
            </CardTitle>
            <CardDescription>Já servidas pelo novo front-end.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {migrated.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-primary flex items-center gap-2 text-sm">
                    <CheckCircle2 className="text-primary size-4" />
                    {item.title}
                    <ArrowRight className="ml-auto size-4 opacity-50" />
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              No portal atual <Badge variant="outline">{legacy.length}</Badge>
            </CardTitle>
            <CardDescription>Abrem o portal que você já usa.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {legacy.map((item) => (
                <li key={`${item.href}:${item.title}`}>
                  {/* Plain anchor: these pages are served by the Blazor portal, outside /app. */}
                  <a href={item.href} className="hover:text-primary flex items-center gap-2 text-sm">
                    <item.icon className="text-muted-foreground size-4" />
                    {item.title}
                    <ExternalLink className="ml-auto size-4 opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
