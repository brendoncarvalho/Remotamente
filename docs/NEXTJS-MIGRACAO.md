# Migração gradual da interface para Next.js

A interface Blazor continua sendo a aplicação principal. O Next.js roda **em paralelo, no mesmo domínio, sob `/app`** (`remoto.brendon.dev.br/app`), e cada tela é migrada aos poucos.

## Arquitetura

- `web/`: Next.js 16 (App Router), Tailwind v4, shadcn/ui, `basePath: "/app"`, `output: "standalone"`.
- Imagem separada: `ghcr.io/brendoncarvalho/remotamente-web` (workflow `.github/workflows/web.yml`).
- Mesmo domínio ⇒ o cookie de login do ASP.NET Identity (`.AspNetCore.Identity.Application`) é enviado também ao Next.
- `web/proxy.ts` só redireciona para `/Account/Login` quando o cookie não existe. **Isso não é segurança**: as páginas que lerem dados devem validar a sessão chamando a API do servidor .NET (que valida o cookie de verdade).
- Links para telas ainda não migradas usam `<a>` simples (não `next/link`, que prefixaria `/app`).
- Nada muda no servidor .NET nem no banco; os agentes não são afetados.

## Subir no Coolify (recurso novo, não toca na produção atual)

1. Novo recurso → Docker Image → `ghcr.io/brendoncarvalho/remotamente-web:latest` (porta 3000).
2. Domínio: `https://remoto.brendon.dev.br/app`.
3. **Desligue "Strip Prefixes"** (o Next já usa `basePath=/app`).
4. Confirme que o Traefik prioriza o caminho `/app` sobre o domínio raiz (regra com `PathPrefix` é mais específica, então vence).
5. Para deploy automático, crie os secrets `COOLIFY_WEB_DEPLOY_URL` e use o `COOLIFY_API_TOKEN` já existente.
6. Teste: `/app/api/health` deve responder 200 e `/app` deve abrir logado.

## Desenvolvimento

```bash
cd web
pnpm install
REMOTAMENTE_DEV_BYPASS_AUTH=1 pnpm dev   # http://localhost:3000/app
pnpm lint && pnpm typecheck && pnpm build
```

## Próximos passos

Dispositivos (lista) → Scripts → Organização → Chaves de API → Logs. Para cada um: endpoint de API no servidor .NET + tela no Next, depois apontar o item do menu (`components/layout/nav-config.ts`) de `legacy` para `new`.
