import type { Metadata } from "next";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "Sobre" };

// Read at request time so one image can be promoted without a rebuild.
export const dynamic = "force-dynamic";

export default function AboutPage() {
  const version = process.env.APP_VERSION ?? "desenvolvimento";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Sobre o Remotamente</h1>
        <p className="text-muted-foreground mt-1">Versão do novo front-end: {version}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Origem e licença</CardTitle>
          <CardDescription>Software livre, mantido por brendon.dev.br.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>
            O Remotamente é baseado no{" "}
            <a
              className="text-primary underline underline-offset-4"
              href="https://github.com/immense/Remotely"
              target="_blank"
              rel="noreferrer">
              Remotely
            </a>{" "}
            (© Immense Networks e colaboradores), distribuído sob a licença GNU GPL v3. Este projeto mantém a mesma
            licença.
          </p>
          <p>
            Quem receber os binários (agente, instalador, cliente desktop) tem direito ao código-fonte correspondente.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
